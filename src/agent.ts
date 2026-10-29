import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import {
  query,
  tool,
  createSdkMcpServer,
  type CanUseTool,
  type SdkMcpToolDefinition,
} from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { logActivity, logMessage, type Actor } from "./activity-log";
import { DATA_DIR, LOG_DIR, ROOT } from "./paths";

export const DEFAULT_MODEL = "claude-opus-5-5";

const READ_ONLY_TOOLS = ["Read", "Glob", "Grep", "WebSearch", "WebFetch", "TodoWrite"];
const WRITE_TOOLS = ["Write", "Edit"];

// 端末で人間に承認を求める。非対話環境では常に拒否する
export async function askHuman(question: string): Promise<boolean> {
  if (!stdin.isTTY) return false;
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(`\n${question}\n承認しますか？ [y/N] `);
    return answer.trim().toLowerCase() === "y";
  } finally {
    rl.close();
  }
}

export function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

// ceo.md の Execution セクションに沿ってタスクを記録する
function recordTaskTool(actor: Actor, taskId: string | null) {
  return tool(
    "record_task",
    "完了したタスクを実績ログに記録する。各タスクの終わりに必ず呼ぶこと。",
    {
      task: z.string().describe("タスク名"),
      actions: z.string().describe("実施内容"),
      findings: z.string().describe("調査結果と根拠（出典URLやファイルを含める）"),
      reasoning: z.string().describe("判断理由"),
      next_actions: z.array(z.string()).describe("次のアクション"),
      approvals_needed: z.array(z.string()).describe("必要な人間の承認（なければ空配列）"),
    },
    async (args) => {
      await mkdir(LOG_DIR, { recursive: true });
      const record = { at: new Date().toISOString(), actor, task_id: taskId, ...args };
      await appendFile(path.join(LOG_DIR, "tasks.jsonl"), JSON.stringify(record) + "\n");
      await logActivity(actor, taskId, "task_record", args);
      return textResult("記録しました。");
    },
  );
}

// 支出・契約・公開・外部送信の前に人間の承認を得る
function requestApprovalTool(actor: Actor, taskId: string | null) {
  return tool(
    "request_human_approval",
    "支出、契約、公開、外部送信を行う前に人間の承認を求める。承認なしにこれらを実行してはならない。",
    {
      category: z.enum(["spend", "contract", "publish", "external_send", "other"]),
      summary: z.string().describe("何を承認してほしいか"),
      amount_jpy: z.number().optional().describe("支出額（円）"),
      reason: z.string().describe("必要な理由と期待効果"),
    },
    async (args) => {
      const amount = args.amount_jpy !== undefined ? `\n金額: ${args.amount_jpy}円` : "";
      await logActivity(actor, taskId, "approval_requested", args);
      const approved = await askHuman(
        `[承認依頼: ${args.category}] ${args.summary}${amount}\n理由: ${args.reason}`,
      );
      await logActivity("human", taskId, "approval_decided", { summary: args.summary, approved });
      return textResult(
        approved
          ? "承認されました。実行手順を人間に提示してください（エージェント自身は外部への支出・送信を行えません）。"
          : "却下されました。別の方法を検討してください。",
      );
    },
  );
}

// 書き込みは data/ 配下に限定し、それ以外のツールは拒否する
function createCanUseTool(serverName: string): CanUseTool {
  return async (toolName, input) => {
    if (READ_ONLY_TOOLS.includes(toolName) || toolName.startsWith(`mcp__${serverName}__`)) {
      return { behavior: "allow", updatedInput: input };
    }
    if (WRITE_TOOLS.includes(toolName)) {
      const target = path.resolve(ROOT, String(input.file_path ?? ""));
      if (target.startsWith(DATA_DIR + path.sep)) {
        return { behavior: "allow", updatedInput: input };
      }
      return { behavior: "deny", message: `書き込みは data/ 配下のみ許可されています: ${target}` };
    }
    return { behavior: "deny", message: `${toolName} は使用できません。` };
  };
}

export type RunAgentOptions = {
  actor: Exclude<Actor, "human">;
  taskId: string | null;
  prompt: string;
  systemPrompt: string;
  model: string;
  // 承認なしで自動実行してよい追加ツール
  tools?: SdkMcpToolDefinition<any>[];
  resume?: string;
  maxTurns?: number;
};

export type RunAgentResult = {
  sessionId: string | undefined;
  success: boolean;
  costUsd: number;
};

// エージェントを1回実行し、出力を表示しながら Activity Log に記録する
export async function runAgent(options: RunAgentOptions): Promise<RunAgentResult> {
  const { actor, taskId } = options;
  const extraTools = options.tools ?? [];
  const server = createSdkMcpServer({
    name: actor,
    version: "1.0.0",
    tools: [recordTaskTool(actor, taskId), requestApprovalTool(actor, taskId), ...extraTools],
  });
  const autoAllowed = ["record_task", ...extraTools.map((t) => t.name)].map(
    (name) => `mcp__${actor}__${name}`,
  );

  const outcome: RunAgentResult = { sessionId: undefined, success: false, costUsd: 0 };
  const messages = query({
    prompt: options.prompt,
    options: {
      model: options.model,
      cwd: ROOT,
      systemPrompt: { type: "preset", preset: "claude_code", append: options.systemPrompt },
      settingSources: [],
      mcpServers: { [actor]: server },
      allowedTools: [...READ_ONLY_TOOLS, ...autoAllowed],
      disallowedTools: ["Bash"],
      canUseTool: createCanUseTool(actor),
      resume: options.resume,
      maxTurns: options.maxTurns ?? 60,
    },
  });

  const label = taskId ? `[${actor}:${taskId}]` : `[${actor}]`;
  for await (const message of messages) {
    await logMessage(actor, taskId, message);
    switch (message.type) {
      case "system":
        if (message.subtype === "init") outcome.sessionId = message.session_id;
        break;
      case "assistant":
        for (const block of message.message.content) {
          if (block.type === "text") console.log(block.text);
          if (block.type === "tool_use") console.log(`  ${label} → ${block.name}`);
        }
        break;
      case "result":
        outcome.costUsd = message.total_cost_usd;
        outcome.success = message.subtype === "success";
        if (outcome.success) {
          console.log(`\n${label} 完了（$${message.total_cost_usd.toFixed(4)}）`);
        } else {
          console.error(`\n${label} 終了: ${message.subtype}（$${message.total_cost_usd.toFixed(4)}）`);
        }
        break;
    }
  }
  return outcome;
}

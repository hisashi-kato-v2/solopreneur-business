import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { DEFAULT_MODEL, runAgent, textResult } from "./agent";
import { LOG_DIR, ROOT } from "./paths";
import { createTask, listTasks, updateTask } from "./tasks";

const SESSION_FILE = path.join(LOG_DIR, "last-session-id");
const MODEL = process.env.CEO_MODEL ?? DEFAULT_MODEL;

// CEO が決めた作業を Task Runner に渡すためのタスクとして登録する
const createTaskTool = tool(
  "create_task",
  "Task Runner に実行させる作業を1件登録する。1タスクは1つの成果物で完結する粒度にすること。",
  {
    title: z.string().describe("タスク名"),
    goal: z.string().describe("目的と、事業上なぜ必要か"),
    steps: z.array(z.string()).describe("具体的な手順"),
    done_criteria: z.array(z.string()).describe("完了条件（成果物のパスを含める）"),
    depends_on: z.array(z.string()).default([]).describe("先に完了が必要なタスクID"),
    approval: z
      .object({
        category: z.enum(["spend", "contract", "publish", "external_send", "other"]),
        reason: z.string(),
      })
      .nullable()
      .default(null)
      .describe("実行前に人間の承認が必要な場合のみ指定"),
  },
  async (args) => {
    const task = await createTask("ceo", args);
    return textResult(`登録しました: ${task.id} ${task.title}`);
  },
);

const listTasksTool = tool(
  "list_tasks",
  "登録済みタスクの一覧と状態、実行結果を取得する。",
  {},
  async () => {
    const tasks = await listTasks();
    if (tasks.length === 0) return textResult("タスクはありません。");
    const lines = tasks.map((t) => {
      const result = t.result ? `\n  結果: ${t.result.summary}\n  成果物: ${t.result.outputs.join(", ")}` : "";
      return `- ${t.id} [${t.status}] ${t.title}${result}`;
    });
    return textResult(lines.join("\n"));
  },
);

const cancelTaskTool = tool(
  "cancel_task",
  "不要になった未実行のタスクを取り消す。",
  { id: z.string(), reason: z.string() },
  async ({ id, reason }) => {
    const task = await updateTask("ceo", id, { status: "cancelled" });
    return textResult(`取り消しました: ${task.id}（${reason}）`);
  },
);

function operatingRules(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `
# Operating Rules

- 今日の日付: ${today}
- 作業ディレクトリ: ${ROOT}
- 既存の調査結果は data/research/、計画は data/plans/ にある。新しい調査の前にまず読み、重複を避けること
- あなたの役割は調査・評価・意思決定。決めた作業は mcp__ceo__create_task で Task Runner に渡す
- タスクを作る前に mcp__ceo__list_tasks で既存タスクと実行結果を確認し、重複を避け、結果を次の判断に反映する
- 成果物は data/ 配下に Markdown で保存する（調査: data/research/、計画: data/plans/、分析: data/reports/）
- 事実・推測・未確認を区別し、【事実】【推測】【未確認】を付記する。事実には出典を付ける
- 支出、契約、公開、外部送信を伴うタスクには approval を指定する。自分で行う場合は mcp__ceo__request_human_approval を使う
- 各タスクの終わりに mcp__ceo__record_task で実績を記録する
`;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const resume = args[0] === "--resume";
  const prompt = (resume ? args.slice(1) : args).join(" ").trim();
  if (!prompt) {
    console.error('使い方: npm run ceo -- [--resume] "指示"');
    process.exit(1);
  }

  const ceoPrompt = await readFile(path.join(ROOT, "prompts", "ceo.md"), "utf8");
  const resumeId = resume
    ? (await readFile(SESSION_FILE, "utf8").catch(() => "")).trim() || undefined
    : undefined;

  const outcome = await runAgent({
    actor: "ceo",
    taskId: null,
    prompt,
    systemPrompt: `${ceoPrompt}\n${operatingRules()}`,
    model: MODEL,
    tools: [createTaskTool, listTasksTool, cancelTaskTool],
    resume: resumeId,
  });

  if (outcome.sessionId) {
    await mkdir(LOG_DIR, { recursive: true });
    await writeFile(SESSION_FILE, outcome.sessionId);
  }
  if (!outcome.success) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

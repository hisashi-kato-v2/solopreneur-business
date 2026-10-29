import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { LOG_DIR } from "./paths";

export type Actor = "ceo" | "runner" | "human";

const ACTIVITY_FILE = path.join(LOG_DIR, "activity.jsonl");
const MAX_TEXT = 2000;

function truncate(text: string): string {
  return text.length > MAX_TEXT ? `${text.slice(0, MAX_TEXT)}…（${text.length}文字）` : text;
}

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((v) => (v && typeof v === "object" && "text" in v ? String(v.text) : JSON.stringify(v)))
      .join("\n");
  }
  return JSON.stringify(value);
}

// すべての活動を data/logs/activity.jsonl に1行ずつ追記する
export async function logActivity(
  actor: Actor,
  taskId: string | null,
  type: string,
  data: Record<string, unknown> = {},
): Promise<void> {
  await mkdir(LOG_DIR, { recursive: true });
  const record = { at: new Date().toISOString(), actor, task_id: taskId, type, ...data };
  await appendFile(ACTIVITY_FILE, JSON.stringify(record) + "\n");
}

// SDKのメッセージから思考・発言・ツール呼び出し・ツール結果を取り出して記録する
export async function logMessage(
  actor: Actor,
  taskId: string | null,
  message: SDKMessage,
): Promise<void> {
  const session = { session_id: message.session_id };
  switch (message.type) {
    case "system":
      if (message.subtype === "init") {
        await logActivity(actor, taskId, "session_start", { ...session, model: message.model });
      }
      break;
    case "assistant":
      for (const block of message.message.content) {
        if (block.type === "thinking") {
          await logActivity(actor, taskId, "thinking", { ...session, text: block.thinking });
        } else if (block.type === "text") {
          await logActivity(actor, taskId, "message", { ...session, text: block.text });
        } else if (block.type === "tool_use") {
          await logActivity(actor, taskId, "tool_call", {
            ...session,
            tool_use_id: block.id,
            tool: block.name,
            input: block.input,
          });
        }
      }
      break;
    case "user":
      if (typeof message.message.content === "string") break;
      for (const block of message.message.content) {
        if (block.type === "tool_result") {
          await logActivity(actor, taskId, "tool_result", {
            ...session,
            tool_use_id: block.tool_use_id,
            is_error: block.is_error ?? false,
            output: truncate(stringify(block.content)),
          });
        }
      }
      break;
    case "result":
      await logActivity(actor, taskId, "session_end", {
        ...session,
        subtype: message.subtype,
        cost_usd: message.total_cost_usd,
        turns: message.num_turns,
      });
      break;
  }
}

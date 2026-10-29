import { readFile } from "node:fs/promises";
import path from "node:path";
import { tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { logActivity } from "./activity-log";
import { DEFAULT_MODEL, askHuman, runAgent, textResult } from "./agent";
import { ROOT } from "./paths";
import { getTask, listTasks, updateTask, type Task } from "./tasks";

const MODEL = process.env.RUNNER_MODEL ?? DEFAULT_MODEL;

// 作業エージェントが結果をタスクに書き戻すためのツール
function completeTaskTool(taskId: string) {
  return tool(
    "complete_task",
    "タスクの実行結果を報告する。作業の最後に必ず1回呼ぶこと。",
    {
      status: z.enum(["done", "blocked"]).describe("完了条件を満たしたら done、進められなければ blocked"),
      summary: z.string().describe("実施内容と結果。blocked の場合は理由と必要な対応"),
      outputs: z.array(z.string()).describe("作成・更新したファイルのパス"),
    },
    async ({ status, summary, outputs }) => {
      await updateTask("runner", taskId, { status, result: { summary, outputs } });
      return textResult(`タスク ${taskId} を ${status} にしました。`);
    },
  );
}

function taskPrompt(task: Task): string {
  const list = (items: string[]) => items.map((s, i) => `${i + 1}. ${s}`).join("\n");
  return `次のタスクを実行してください。

# ${task.id}: ${task.title}

## 目的
${task.goal}

## 手順
${list(task.steps)}

## 完了条件
${list(task.done_criteria)}
`;
}

function operatingRules(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `
# Operating Rules

- 今日の日付: ${today}
- 作業ディレクトリ: ${ROOT}
- 事業の背景は data/research/ と data/plans/ にある。必要に応じて読むこと
- 事実・推測・未確認を区別し、【事実】【推測】【未確認】を付記する。事実には出典を付ける
- 支出、契約、公開、外部送信が必要になったら mcp__runner__request_human_approval を使う
- 終わったら mcp__runner__record_task で実績を記録し、mcp__runner__complete_task で結果を報告する
`;
}

async function isRunnable(task: Task): Promise<boolean> {
  for (const dep of task.depends_on) {
    if ((await getTask(dep))?.status !== "done") return false;
  }
  return true;
}

// 承認が必要なタスクは、実行前に人間の承認を得る
async function ensureApproved(task: Task): Promise<boolean> {
  if (!task.approval || task.approval.approved) return true;
  await logActivity("runner", task.id, "approval_requested", task.approval);
  const approved = await askHuman(
    `[承認依頼: ${task.approval.category}] ${task.id} ${task.title}\n理由: ${task.approval.reason}`,
  );
  await logActivity("human", task.id, "approval_decided", { approved });
  await updateTask("human", task.id, {
    approval: { ...task.approval, approved },
    ...(approved ? {} : { status: "blocked", result: { summary: "人間が承認しなかった", outputs: [] } }),
  });
  return approved;
}

async function runTask(task: Task, systemPrompt: string): Promise<void> {
  console.log(`\n=== ${task.id}: ${task.title} ===`);
  if (!(await ensureApproved(task))) {
    console.log(`${task.id} は承認されなかったため blocked にしました。`);
    return;
  }

  await updateTask("runner", task.id, { status: "running" });
  const outcome = await runAgent({
    actor: "runner",
    taskId: task.id,
    prompt: taskPrompt(task),
    systemPrompt,
    model: MODEL,
    tools: [completeTaskTool(task.id)],
  });

  // complete_task が呼ばれずに終わった場合は blocked にして人間の確認を待つ
  const after = await getTask(task.id);
  if (after?.status === "running") {
    const reason = outcome.success ? "結果が報告されなかった" : "実行中にエラーで終了した";
    await updateTask("runner", task.id, { status: "blocked", result: { summary: reason, outputs: [] } });
  }
}

function printTasks(tasks: Task[]): void {
  if (tasks.length === 0) console.log("タスクはありません。");
  for (const t of tasks) {
    const deps = t.depends_on.length ? `（依存: ${t.depends_on.join(", ")}）` : "";
    console.log(`${t.id} [${t.status}] ${t.title}${deps}`);
    if (t.result) console.log(`  ${t.result.summary}`);
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args[0] === "--list") {
    printTasks(await listTasks());
    return;
  }

  const runnerPrompt = await readFile(path.join(ROOT, "prompts", "runner.md"), "utf8");
  const systemPrompt = `${runnerPrompt}\n${operatingRules()}`;

  // ID指定時は blocked のタスクも再実行できる
  if (args.length > 0) {
    for (const id of args) {
      const task = await getTask(id);
      if (!task) {
        console.error(`タスクが見つかりません: ${id}`);
        process.exitCode = 1;
      } else if (task.status === "done" || task.status === "cancelled") {
        console.log(`${id} は ${task.status} のためスキップします。`);
      } else if (!(await isRunnable(task))) {
        console.log(`${id} は依存タスクが未完了のためスキップします。`);
      } else {
        await runTask(task, systemPrompt);
      }
    }
    return;
  }

  // 実行できる pending タスクがなくなるまで順に実行する
  const attempted = new Set<string>();
  while (true) {
    let next: Task | undefined;
    for (const task of await listTasks()) {
      if (task.status === "pending" && !attempted.has(task.id) && (await isRunnable(task))) {
        next = task;
        break;
      }
    }
    if (!next) break;
    attempted.add(next.id);
    await runTask(next, systemPrompt);
  }

  console.log(attempted.size === 0 ? "\n実行できるタスクはありません。" : "\n実行結果:");
  printTasks(await listTasks());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { logActivity, type Actor } from "./activity-log";
import { TASK_DIR } from "./paths";

export type TaskStatus = "pending" | "running" | "done" | "blocked" | "cancelled";

export type ApprovalCategory = "spend" | "contract" | "publish" | "external_send" | "other";

export type Task = {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  done_criteria: string[];
  depends_on: string[];
  approval: { category: ApprovalCategory; reason: string; approved: boolean | null } | null;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
  result: { summary: string; outputs: string[] } | null;
};

export type NewTask = Pick<Task, "title" | "goal" | "steps" | "done_criteria" | "depends_on"> & {
  approval: { category: ApprovalCategory; reason: string } | null;
};

function taskFile(id: string): string {
  return path.join(TASK_DIR, `${id}.json`);
}

async function save(task: Task): Promise<void> {
  await mkdir(TASK_DIR, { recursive: true });
  await writeFile(taskFile(task.id), JSON.stringify(task, null, 2) + "\n");
}

export async function listTasks(): Promise<Task[]> {
  const files = await readdir(TASK_DIR).catch(() => [] as string[]);
  const tasks = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map(async (f) => JSON.parse(await readFile(path.join(TASK_DIR, f), "utf8")) as Task),
  );
  return tasks;
}

export async function getTask(id: string): Promise<Task | undefined> {
  return readFile(taskFile(id), "utf8")
    .then((s) => JSON.parse(s) as Task)
    .catch(() => undefined);
}

export async function createTask(actor: Actor, input: NewTask): Promise<Task> {
  const count = (await listTasks()).length;
  const now = new Date().toISOString();
  const task: Task = {
    ...input,
    id: `T${String(count + 1).padStart(4, "0")}`,
    approval: input.approval && { ...input.approval, approved: null },
    status: "pending",
    created_at: now,
    updated_at: now,
    result: null,
  };
  await save(task);
  await logActivity(actor, task.id, "task_created", { title: task.title });
  return task;
}

export async function updateTask(
  actor: Actor,
  id: string,
  patch: Partial<Pick<Task, "status" | "approval" | "result">>,
): Promise<Task> {
  const task = await getTask(id);
  if (!task) throw new Error(`タスクが見つかりません: ${id}`);
  const updated: Task = { ...task, ...patch, updated_at: new Date().toISOString() };
  await save(updated);
  if (patch.status && patch.status !== task.status) {
    await logActivity(actor, id, "task_status", { from: task.status, to: patch.status });
  }
  return updated;
}

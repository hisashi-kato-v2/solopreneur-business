import path from "node:path";

export const ROOT = path.resolve(__dirname, "..");
export const DATA_DIR = path.join(ROOT, "data");
export const LOG_DIR = path.join(DATA_DIR, "logs");
export const TASK_DIR = path.join(DATA_DIR, "tasks");

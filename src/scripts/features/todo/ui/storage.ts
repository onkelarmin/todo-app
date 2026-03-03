import { storedTodosSchema } from "../schema";
import type { Todo } from "../types";

export function loadTodosFromStorage(): Todo[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("todos");
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    const result = storedTodosSchema.safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

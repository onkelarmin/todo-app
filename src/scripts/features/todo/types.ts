import type { z } from "astro:schema";
import type { Filter } from "./constants";
import type { storedTodoSchema } from "./schema";

export type Todo = z.infer<typeof storedTodoSchema>;

export type State = {
  todos: Todo[];
  filter: Filter;
};

export type Action =
  | { type: "todo/add"; text: string }
  | { type: "todo/delete"; id: string }
  | { type: "todo/toggle"; id: string; checked: boolean }
  | { type: "todo/clearCompleted" }
  | { type: "filter/set"; filter: Filter }
  | { type: "todo/reorder"; orderedIds: string[] };

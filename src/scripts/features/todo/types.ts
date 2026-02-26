import type { Filter } from "./constants";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  order: number;
  createdAt: number;
};

export type State = {
  todos: Todo[];
  filter: Filter;
};

export type Action =
  | { type: "todo/add"; text: string }
  | { type: "todo/delete"; id: string }
  | { type: "todo/toggle"; id: string; checked: boolean }
  | { type: "todo/clearCompleted" }
  | { type: "filter/set"; filter: Filter };

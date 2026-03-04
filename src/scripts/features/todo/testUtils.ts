import type { State, Todo } from "./types";

export function makeTodo(num: number, overrides: Partial<Todo> = {}): Todo {
  return {
    id: `todo-${num}`,
    text: `Todo ${num}`,
    completed: false,
    order: num,
    createdAt: new Date("2020-01-01T00:00:00.000Z").getTime(),
    ...overrides,
  };
}

export function makeState(overrides: Partial<State> = {}): State {
  return {
    filter: "all",
    todos: [],
    ...overrides,
  };
}

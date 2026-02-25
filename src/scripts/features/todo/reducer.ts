import type { Action, State, Todo } from "./types";

function nextOrder(todos: Todo[]) {
  let max = 0;

  for (const t of todos) {
    if (t.order > max) max = t.order;
  }

  return max + 1;
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "todo/add": {
      const text = action.text.trim();
      if (!text) return state;

      const todo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        order: 1,
        createdAt: Date.now(),
      };

      return {
        ...state,
        todos: [...state.todos, todo],
      };
    }
    default:
      return state;
  }
}

import type { State } from "./types";

export function selectActiveCount(state: State) {
  return state.todos.filter((t) => !t.completed).length;
}

export function selectVisibleTodos(state: State) {
  switch (state.filter) {
    case "all": {
      return state.todos;
    }
    case "active": {
      return state.todos.filter((t) => !t.completed);
    }
    case "completed": {
      return state.todos.filter((t) => t.completed);
    }
    default: {
      const exhaustiveCheck: never = state.filter;
      throw new Error(`Unexpected filter: ${exhaustiveCheck}`);
    }
  }
}

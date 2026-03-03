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
        order: nextOrder(state.todos),
        createdAt: Date.now(),
      };

      return {
        ...state,
        todos: [...state.todos, todo],
      };
    }
    case "todo/delete": {
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.id),
      };
    }
    case "todo/toggle": {
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, completed: action.checked } : t,
        ),
      };
    }
    case "todo/clearCompleted": {
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
      };
    }
    case "todo/reorder": {
      const idSet = new Set(action.orderedIds);

      const subset = state.todos.filter((t) => idSet.has(t.id));

      const sortedValues = subset.map((t) => t.order).toSorted((a, b) => a - b);

      const orderedMap = new Map(
        action.orderedIds.map((id, i) => [id, sortedValues[i]]),
      );

      return {
        ...state,
        todos: state.todos.map((t) => {
          const newOrder = orderedMap.get(t.id);
          if (newOrder === undefined) return t;
          if (t.order === newOrder) return t;
          return { ...t, order: newOrder };
        }),
      };
    }
    case "filter/set": {
      if (state.filter === action.filter) return state;

      return {
        ...state,
        filter: action.filter,
      };
    }
    default:
      return state;
  }
}

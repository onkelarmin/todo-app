import { describe, it, expect, vi } from "vitest";
import { reducer } from "./reducer";
import type { Action } from "./types";
import { makeState, makeTodo } from "./testUtils";

describe("todoReducer.addTodo", () => {
  it("adds a todo with trimmed text", () => {
    vi.spyOn(Date, "now").mockReturnValue(123);
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      "00000000-0000-0000-0000-000000000001",
    );

    const state = makeState();

    const action: Action = { type: "todo/add", text: "   new task   " };
    const newState = reducer(state, action);

    // Immutability
    expect(newState).not.toBe(state);
    expect(newState.todos).not.toBe(state.todos);
    expect(state.todos).toHaveLength(0);

    // Behaviour
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0]).toMatchObject({
      id: "00000000-0000-0000-0000-000000000001",
      text: "new task",
      completed: false,
      order: 1,
      createdAt: 123,
    });

    vi.restoreAllMocks();
  });

  it("returns same state when text is empty after trim", () => {
    const state = makeState();

    const action: Action = { type: "todo/add", text: "   " };

    const newState = reducer(state, action);

    expect(newState).toBe(state);
  });
});

describe("todoReducer.deleteTodo", () => {
  it("removes the todo with the given id", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3)];

    const state = makeState({
      todos,
    });

    const action: Action = { type: "todo/delete", id: "todo-2" };

    const newState = reducer(state, action);

    // Immutability
    expect(newState).not.toBe(state);
    expect(newState.todos).not.toBe(state.todos);
    expect(state.todos).toHaveLength(3);

    // Behaviour
    expect(newState.todos).toHaveLength(2);
    expect(newState.todos.map((t) => t.id)).toEqual(["todo-1", "todo-3"]);
  });
  it("returns the same todos if an invalid id is passed in", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3)];

    const state = makeState({
      todos,
    });

    const action: Action = { type: "todo/delete", id: "todo-4" };

    const newState = reducer(state, action);

    // Behaviour
    expect(newState.todos).toEqual(state.todos);
  });
});

describe("todoReducer.clearCompleted", () => {
  it("removes the todos which have completed set to true", () => {
    const todos = [
      makeTodo(1),
      makeTodo(2, { completed: true }),
      makeTodo(3),
      makeTodo(4, { completed: true }),
    ];
    const state = makeState({
      todos,
    });

    const action: Action = { type: "todo/clearCompleted" };

    const newState = reducer(state, action);

    // Immutability
    expect(newState).not.toBe(state);
    expect(newState.todos).not.toBe(state.todos);
    expect(state.todos).toHaveLength(4);

    // Behaviour
    expect(newState.todos).toHaveLength(2);
    expect(newState.todos.map((t) => t.id)).toEqual(["todo-1", "todo-3"]);
  });

  it("returns the same state if there are no completed tasks", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3)];
    const state = makeState({
      todos,
    });

    const action: Action = { type: "todo/clearCompleted" };

    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });
});

describe("todoReducer.toggleTodo", () => {
  it("toggles the completed state for the todo of given id", () => {
    const todos = [makeTodo(1), makeTodo(2, { completed: true }), makeTodo(3)];

    const state = makeState({
      todos,
    });

    const action: Action = { type: "todo/toggle", id: "todo-3", checked: true };

    const newState = reducer(state, action);

    // Immutability
    expect(newState).not.toBe(state);
    expect(newState.todos).not.toBe(state.todos);
    expect(state.todos).toHaveLength(3);

    // Behaviour
    expect(newState.todos.find((t) => t.id === "todo-3")?.completed).toBe(true);
    expect(newState.todos[0]).toBe(state.todos[0]);
    expect(newState.todos[1]).toBe(state.todos[1]);
  });
});

describe("todoReducer.reorderTodos", () => {
  it("reorders the specified todos correctly", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3), makeTodo(4)];
    const state = makeState({
      todos,
    });

    const orderedIds = ["todo-2", "todo-1", "todo-4", "todo-3"];

    const action: Action = {
      type: "todo/reorder",
      orderedIds,
    };

    const newState = reducer(state, action);

    expect(newState).not.toBe(state);
    expect(newState.todos).not.toBe(state.todos);

    expect(
      newState.todos.toSorted((a, b) => a.order - b.order).map((t) => t.id),
    ).toEqual(orderedIds);
  });

  it("preserves the original order values", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3), makeTodo(4)];
    const state = makeState({
      todos,
    });

    const orderedIds = ["todo-2", "todo-1", "todo-4", "todo-3"];

    const action: Action = {
      type: "todo/reorder",
      orderedIds,
    };

    const newState = reducer(state, action);

    const orderSet = new Set(todos.map((t) => t.order));
    const newOrderSet = new Set(newState.todos.map((t) => t.order));

    expect(orderSet).toEqual(newOrderSet);
  });

  it("Only affects the subset of todos included in orderedIds", () => {
    const todos = [
      makeTodo(1),
      makeTodo(2, { completed: true }),
      makeTodo(3, { completed: true }),
      makeTodo(4),
    ];
    const state = makeState({
      filter: "completed",
      todos,
    });

    const orderedIds = ["todo-3", "todo-2"];

    const action: Action = {
      type: "todo/reorder",
      orderedIds,
    };

    const newState = reducer(state, action);

    expect(
      newState.todos
        .filter((t) => t.completed)
        .toSorted((a, b) => a.order - b.order)
        .map((t) => t.id),
    ).toEqual(orderedIds);
    expect(newState.todos.filter((t) => !t.completed)).toEqual(
      state.todos.filter((t) => !t.completed),
    );
  });

  it("returns the same state if the order hasn't changed", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3), makeTodo(4)];
    const state = makeState({
      todos,
    });

    const orderedIds = ["todo-1", "todo-2", "todo-3", "todo-4", "todo-5"];

    const action: Action = {
      type: "todo/reorder",
      orderedIds,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual(state);
    expect(newState.todos[0]).toBe(state.todos[0]);
  });

  it("ignores unknown IDs", () => {
    const todos = [makeTodo(1), makeTodo(2), makeTodo(3), makeTodo(4)];
    const state = makeState({
      todos,
    });

    const orderedIds = ["todo-1", "todo-2", "todo-3", "todo-5"];

    const action: Action = {
      type: "todo/reorder",
      orderedIds,
    };

    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });
});

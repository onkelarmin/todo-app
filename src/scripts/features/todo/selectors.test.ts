import { describe, it, expect } from "vitest";
import { makeState, makeTodo } from "./testUtils";
import { selectActiveCount, selectVisibleTodos } from "./selectors";

describe("todoSelectors.selectActiveCount", () => {
  it("returns the correct active count", () => {
    const state = makeState({
      todos: [makeTodo(1), makeTodo(2, { completed: true }), makeTodo(3)],
    });

    expect(selectActiveCount(state)).toBe(2);
  });

  it("returns 0 when there are no todos", () => {
    const state = makeState();

    expect(selectActiveCount(state)).toBe(0);
  });
});

describe("todoSelectors.selectVisibleTodos", () => {
  it("returns all todos when filter is 'all'", () => {
    const todos = [
      makeTodo(1),
      makeTodo(2, { completed: true }),
      makeTodo(3),
      makeTodo(4, { completed: true }),
    ];
    const state = makeState({
      todos,
    });

    expect(selectVisibleTodos(state)).toBe(todos);
  });

  it("returns only active todos when filter is 'active'", () => {
    const todos = [
      makeTodo(1),
      makeTodo(2, { completed: true }),
      makeTodo(3),
      makeTodo(4, { completed: true }),
    ];
    const state = makeState({
      filter: "active",
      todos,
    });

    expect(selectVisibleTodos(state)).toEqual([todos[0], todos[2]]);
  });

  it("returns only completed todos when filter is 'completed'", () => {
    const todos = [
      makeTodo(1),
      makeTodo(2, { completed: true }),
      makeTodo(3),
      makeTodo(4, { completed: true }),
    ];

    const state = makeState({
      filter: "completed",
      todos,
    });

    expect(selectVisibleTodos(state)).toEqual([todos[1], todos[3]]);
  });
});

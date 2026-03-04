import { describe, it, expect, afterEach } from "vitest";
import { loadTodosFromStorage } from "./storage";
import { makeTodo } from "../testUtils";

describe("todoStorage.loadTodosFromStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("returns todos if it receives a valid payload from the localStorage", () => {
    const saved = [makeTodo(1), makeTodo(2), makeTodo(3)];

    localStorage.setItem("todos", JSON.stringify(saved));

    const todos = loadTodosFromStorage();

    expect(Array.isArray(todos)).toBe(true);
    expect(todos).toHaveLength(3);
    expect(todos).toEqual(saved);
  });

  it("returns an empty array when payload fails schema validation", () => {
    const saved = [
      {
        id: "todo-1",
        text: "Todo 1",
        completed: false,
        order: 1,
        // createdAt: new Date("2020-01-01T00:00:00.000Z").getTime(),
      },
    ];

    localStorage.setItem("todos", JSON.stringify(saved));

    const todos = loadTodosFromStorage();

    expect(todos).toEqual([]);
  });

  it("returns an empty array if localStorage contains corrupt JSON", () => {
    localStorage.setItem("todos", "this is not valid JSON");

    const todos = loadTodosFromStorage();

    expect(todos).toEqual([]);
  });

  it("returns an empty array if localStorage has no todos", () => {
    const todos = loadTodosFromStorage();

    expect(todos).toEqual([]);
  });
});

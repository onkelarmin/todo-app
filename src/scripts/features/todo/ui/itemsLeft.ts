import type { State } from "../types";
import type { TodoDOM } from "./dom";

export function updateItemsLeft(state: State, dom: TodoDOM) {
  const active = state.todos.filter((t) => !t.completed).length;

  dom.itemsLeft.textContent = `${String(active)} Item${active === 1 ? "" : "s"} left`;
}

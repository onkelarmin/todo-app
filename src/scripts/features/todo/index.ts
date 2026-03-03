import { createStore } from "./store";
import type { State } from "./types";
import { renderWithFlip } from "./ui/animate";
import { getTodoDOM } from "./ui/dom";
import { setupDragDrop } from "./ui/dragDrop";
import { bindEvents } from "./ui/events";
import { updateFilterButtons } from "./ui/filterButtons";
import { updateItemsLeft } from "./ui/itemsLeft";
import { loadTodosFromStorage } from "./ui/storage";

export function initTodo() {
  const dom = getTodoDOM();

  const todos = loadTodosFromStorage();

  const store = createStore({ todos, filter: "all" });

  bindEvents(dom, store);

  store.subscribe((state) => {
    renderWithFlip(state, dom);
  });
  store.subscribe((state) => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  });
  store.subscribe((state) => {
    updateItemsLeft(state, dom);
  });
  store.subscribe((state) => {
    updateFilterButtons(state, dom);
  });

  setupDragDrop(dom, store);
}

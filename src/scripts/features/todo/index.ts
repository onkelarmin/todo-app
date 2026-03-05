import { createStore } from "./store";
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

  const detachEvents = bindEvents(dom, store);

  let unsubscribes = [];

  const unsubRenderWithFlip = store.subscribe(
    (state) => {
      renderWithFlip(state, dom);
    },
    { fireImmediately: true },
  );
  unsubscribes.push(unsubRenderWithFlip);

  const unsubSaveLocalStorage = store.subscribe((state) => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  });
  unsubscribes.push(unsubSaveLocalStorage);

  const unsubUpdateItemsLeft = store.subscribe(
    (state) => {
      updateItemsLeft(state, dom);
    },
    { fireImmediately: true },
  );
  unsubscribes.push(unsubUpdateItemsLeft);

  const unsubUpdateFilterButtons = store.subscribe(
    (state) => {
      updateFilterButtons(state, dom);
    },
    { fireImmediately: true },
  );
  unsubscribes.push(unsubUpdateFilterButtons);

  const destroyDragDrop = setupDragDrop(dom, store);

  return () => {
    detachEvents();
    unsubscribes.forEach((fn) => fn());
    destroyDragDrop();
  };
}

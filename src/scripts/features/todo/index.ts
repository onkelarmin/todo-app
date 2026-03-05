import { createStore, type Store } from "./store";
import { createTodoRenderer } from "./ui/animate";
import { getTodoDOM, type TodoDOM } from "./ui/dom";
import { setupDragDrop } from "./ui/dragDrop";
import { bindEvents } from "./ui/events";
import { updateFilterButtons } from "./ui/filterButtons";
import { updateItemsLeft } from "./ui/itemsLeft";
import { loadTodosFromStorage } from "./ui/storage";

export function initTodo() {
  const dom = getTodoDOM();
  const store = createTodoStore();

  const cleanupSubscribers = registerTodoSubscribers(dom, store);
  const cleanupInteractions = registerTodoInteractions(dom, store);

  return () => {
    cleanupSubscribers();
    cleanupInteractions();
  };
}

function createTodoStore() {
  const todos = loadTodosFromStorage();
  return createStore({ todos, filter: "all" });
}

function registerTodoSubscribers(dom: TodoDOM, store: Store) {
  let unsubscribes: Array<() => void> = [];

  const renderer = createTodoRenderer(dom);

  unsubscribes.push(
    store.subscribe(
      (state) => {
        renderer.render(state);
      },
      { fireImmediately: true },
    ),
  );

  unsubscribes.push(
    store.subscribe((state) => {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    }),
  );

  unsubscribes.push(
    store.subscribe(
      (state) => {
        updateItemsLeft(state, dom);
      },
      { fireImmediately: true },
    ),
  );

  unsubscribes.push(
    store.subscribe(
      (state) => {
        updateFilterButtons(state, dom);
      },
      { fireImmediately: true },
    ),
  );

  return () => {
    renderer.destroy();
    unsubscribes.forEach((fn) => fn());
  };
}

function registerTodoInteractions(dom: TodoDOM, store: Store) {
  const detachEvents = bindEvents(dom, store);
  const destroyDragDrop = setupDragDrop(dom, store);

  return () => {
    detachEvents();
    destroyDragDrop();
  };
}

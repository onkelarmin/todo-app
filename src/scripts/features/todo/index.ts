import { todoSchema } from "./schema";
import { createStore } from "./store";
import type { State } from "./types";
import { renderWithFlip } from "./ui/animate";
import { getTodoDOM } from "./ui/dom";
import { setupDragDrop } from "./ui/dragDrop";
import { bindEvents } from "./ui/events";
import { updateFilterButtons } from "./ui/filterButtons";
import { updateItemsLeft } from "./ui/itemsLeft";

export function initTodo() {
  const dom = getTodoDOM();

  const saved = localStorage.getItem("todos");

  // if(saved) {
  //     const parsed = JSON.parse(saved)

  // }
  // const parsed = JSON.parse(saved)

  // const result = todoSchema.safeParse(parsed)

  // const todos = result.success ? result.data : []

  // const preloadedState: State | undefined = saved
  //   ? { todos, filter: "all" }
  //   : undefined;

  const store = createStore();

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

  // store.dispatch({ type: "todo/add", text: "1 Learn react!" });
  // store.dispatch({ type: "todo/add", text: "2 Learn it fast!" });
  // store.dispatch({ type: "todo/add", text: "3 Vanilla sucks!" });
  // store.dispatch({ type: "todo/add", text: "4 Learn react!" });
  // store.dispatch({ type: "todo/add", text: "5 Learn it fast!" });
  // store.dispatch({ type: "todo/add", text: "6 Vanilla sucks!" });

  setupDragDrop(dom, store);
}

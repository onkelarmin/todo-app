import { createStore } from "./store";
import { getTodoDOM } from "./ui/dom";
import { bindEvents } from "./ui/events";
import { updateFilterButtons } from "./ui/filterButtons";
import { updateItemsLeft } from "./ui/itemsLeft";
import { render } from "./ui/render";

export function initTodo() {
  const dom = getTodoDOM();
  const store = createStore();

  bindEvents(dom, store);

  store.dispatch({ type: "todo/add", text: "Learn react!" });
  store.dispatch({ type: "todo/add", text: "Learn it fast!" });
  store.dispatch({ type: "todo/add", text: "Vanilla sucks!" });

  store.subscribe((state) => {
    render(state, dom);
  });
  store.subscribe((state) => {
    updateItemsLeft(state, dom);
  });
  store.subscribe((state) => {
    updateFilterButtons(state, dom);
  });
}

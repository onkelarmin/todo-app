import Sortable from "sortablejs";
import type { TodoDOM } from "./dom";
import type { Store } from "../store";
import { customProp } from "@/scripts/shared/utils/helper";

export function setupDragDrop(dom: TodoDOM, store: Store) {
  const list = dom.todoList;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const getItems = () =>
    Array.from(list.querySelectorAll<HTMLLIElement>(".todo-list-item"));

  const sortable = Sortable.create(list, {
    animation: reduceMotion ? 0 : 350,
    easing: customProp("--ease-out"),
    chosenClass: "chosen",
    dragClass: "drag",

    onChoose: () => {
      getItems().forEach((i) => i.classList.add("is-moving"));
    },

    onUnchoose: () => {
      getItems().forEach((i) => i.classList.remove("is-moving"));
    },

    onEnd: () => {
      const orderedIds = getItems()
        .map((i) => i.dataset.id)
        .filter(Boolean) as string[];

      store.dispatch({ type: "todo/reorder", orderedIds });
    },
  });
}

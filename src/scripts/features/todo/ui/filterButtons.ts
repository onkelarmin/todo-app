import type { State } from "../types";
import type { TodoDOM } from "./dom";

export function updateFilterButtons(state: State, dom: TodoDOM) {
  dom.filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      button.dataset.filter === state.filter ? "true" : "false",
    );
  });
}

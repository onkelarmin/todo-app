import { selectActiveCount } from "../selectors";
import type { State } from "../types";
import type { TodoDOM } from "./dom";

export function updateItemsLeft(state: State, dom: TodoDOM) {
  const active = selectActiveCount(state);

  dom.itemsLeft.textContent = `${String(active)} Item${active === 1 ? "" : "s"} left`;
}

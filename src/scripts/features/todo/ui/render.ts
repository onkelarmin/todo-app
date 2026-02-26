import type { State } from "../types";
import type { TodoDOM } from "./dom";

export function render(state: State, dom: TodoDOM) {
  dom.todoList.innerHTML = "";

  const sorted = state.todos.toSorted((a, b) => a.order - b.order);

  sorted.forEach((todo) => {
    const clone = dom.todoListItemTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    const taskSpans = clone.querySelectorAll<HTMLSpanElement>(".task");
    const li = clone.querySelector<HTMLLIElement>(".todo-list-item");
    const checkToggleInput = clone.querySelector<HTMLInputElement>(
      ".check-toggle input",
    );

    if (li) li.dataset.id = todo.id;

    if (checkToggleInput) checkToggleInput.checked = todo.completed;

    taskSpans.forEach((span) => (span.textContent = todo.text));

    dom.todoList.appendChild(clone);
  });
}

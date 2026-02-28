import { selectVisibleTodos } from "../selectors";
import type { State } from "../types";
import type { TodoDOM } from "./dom";

export function render(state: State, dom: TodoDOM) {
  const visible = selectVisibleTodos(state);
  const visibleMap = new Map(visible.map((t) => [t.id, t]));
  const visibleIds = new Set(visible.map((t) => t.id));

  const renderedTodos = [
    ...dom.todoList.querySelectorAll<HTMLLIElement>("li[data-id]"),
  ];
  const renderedIds = new Set(
    renderedTodos.map((el) => el.dataset.id).filter(Boolean) as string[],
  );

  const sorted = visible.toSorted((a, b) => a.order - b.order);

  renderedTodos.forEach((todoEl) => {
    const id = todoEl.dataset.id;
    if (!id) return;

    // remove items no longer visible
    if (!visibleMap.has(id)) {
      todoEl.remove();
      return;
    }

    // update existing item
    const todo = visibleMap.get(id);
    if (!todo) return;

    const checkToggleInput = todoEl.querySelector<HTMLInputElement>(
      ".check-toggle input",
    );
    if (checkToggleInput) checkToggleInput.checked = todo.completed;

    const taskSpans = todoEl.querySelectorAll<HTMLSpanElement>(".task");
    taskSpans.forEach((span) => (span.textContent = todo.text));
  });

  sorted.forEach((todo) => {
    if (renderedIds.has(todo.id)) {
      // reorder existing items
      const el = dom.todoList.querySelector<HTMLLIElement>(
        `[data-id='${todo.id}']`,
      );
      if (el) dom.todoList.appendChild(el);
      return;
    }

    // create missing items
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

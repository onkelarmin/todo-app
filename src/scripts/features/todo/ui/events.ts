import { isFilter } from "../constants";
import { todoSchema } from "../schema";
import type { Store } from "../store";
import type { TodoDOM } from "./dom";
import { createZodFormController } from "@/scripts/shared/forms/zodForm";

export function bindEvents(dom: TodoDOM, store: Store) {
  // Create todo
  const formController = createZodFormController(dom.form, todoSchema);
  formController.attachFieldValidation();

  dom.form.addEventListener("click", (e) => {
    if (e.target instanceof HTMLInputElement) return;
    dom.formInput.focus();
  });

  dom.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const result = formController.validateForm();

    if (!result.ok) return;

    store.dispatch({ type: "todo/add", text: result.data.todo });

    dom.form.reset();
  });

  // Delete button
  dom.todoList.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;

    const deleteButton = e.target.closest(".delete-button");
    if (!deleteButton) return;

    const li = deleteButton.closest<HTMLLIElement>("li");
    const id = li?.dataset.id;

    if (!id) {
      console.error("li missing data-id");
      return;
    }

    store.dispatch({ type: "todo/delete", id });
  });

  // Toggle complete
  dom.todoList.addEventListener("change", (e) => {
    if (!(e.target instanceof Element)) return;

    const checkToggleInput = e.target.closest<HTMLInputElement>(
      ".check-toggle-input",
    );
    if (!checkToggleInput) return;

    const checked = checkToggleInput.checked;

    const li = checkToggleInput.closest<HTMLLIElement>("li");
    const id = li?.dataset.id;

    if (!id) {
      console.error("li missing data-id");
      return;
    }

    store.dispatch({ type: "todo/toggle", id, checked });
  });

  // Clear completed
  dom.clearCompletedButton.addEventListener("click", () => {
    store.dispatch({ type: "todo/clearCompleted" });
  });

  // Filter
  dom.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      if (!filter) {
        console.error("Data-filter attribute missing");
        return;
      }

      if (!isFilter(filter)) {
        console.error("Unknown data-filter value");
        return;
      }

      store.dispatch({ type: "filter/set", filter });
    });
  });
}

import { isFilter } from "../constants";
import { todoSchema } from "../schema";
import type { Store } from "../store";
import type { TodoDOM } from "./dom";
import { createZodFormController } from "@/scripts/shared/forms/zodForm";

export function bindEvents(dom: TodoDOM, store: Store) {
  // Setup Formcontroller
  const formController = createZodFormController(dom.form, todoSchema);

  const detachFormFieldValidation = formController.attachFieldValidation();

  // On Form click focus input
  const onFormClick = (e: MouseEvent) => {
    if (e.target instanceof HTMLInputElement) return;
    dom.formInput.focus();
  };
  dom.form.addEventListener("click", onFormClick);

  // Form submission
  const onFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const result = formController.validateForm();

    if (!result.ok) return;

    store.dispatch({ type: "todo/add", text: result.data.todo });

    dom.form.reset();
  };
  dom.form.addEventListener("submit", onFormSubmit);

  // Delete button
  const onDeleteClick = (e: MouseEvent) => {
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
  };
  dom.todoList.addEventListener("click", onDeleteClick);

  // Toggle complete
  const onToggleComplete = (e: Event) => {
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
  };
  dom.todoList.addEventListener("change", onToggleComplete);

  // Clear completed
  const onClearCompletedClick = () => {
    store.dispatch({ type: "todo/clearCompleted" });
  };
  dom.clearCompletedButton.addEventListener("click", onClearCompletedClick);

  // Filter
  const onFilterClick = (e: MouseEvent) => {
    const button = e.currentTarget;

    if (!(button instanceof HTMLButtonElement)) return;

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
  };
  dom.filterButtons.forEach((button) => {
    button.addEventListener("click", onFilterClick);
  });

  return () => {
    detachFormFieldValidation();
    dom.form.removeEventListener("click", onFormClick);
    dom.form.removeEventListener("submit", onFormSubmit);
    dom.todoList.removeEventListener("click", onDeleteClick);
    dom.todoList.removeEventListener("change", onToggleComplete);
    dom.clearCompletedButton.removeEventListener(
      "click",
      onClearCompletedClick,
    );
    dom.filterButtons.forEach((button) => {
      button.removeEventListener("click", onFilterClick);
    });
  };
}

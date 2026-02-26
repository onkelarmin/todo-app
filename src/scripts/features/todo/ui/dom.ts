export type TodoDOM = {
  form: HTMLFormElement;
  formInput: HTMLInputElement;
  todoList: HTMLUListElement;
  todoListItemTemplate: HTMLTemplateElement;
  clearCompletedButton: HTMLButtonElement;
  itemsLeft: HTMLParagraphElement;
};

export function getTodoDOM() {
  const form = document.querySelector<HTMLFormElement>("#create-todo-form");
  const formInput =
    document.querySelector<HTMLInputElement>("#create-todo-input");
  const todoList = document.querySelector<HTMLUListElement>(".todos-list");
  const todoListItemTemplate = document.querySelector<HTMLTemplateElement>(
    "#todo-list-item-template",
  );
  const clearCompletedButton = document.querySelector<HTMLButtonElement>(
    ".clear-completed-button",
  );
  const itemsLeft = document.querySelector<HTMLParagraphElement>(".items-left");

  if (
    !form ||
    !formInput ||
    !todoList ||
    !todoListItemTemplate ||
    !clearCompletedButton ||
    !itemsLeft
  ) {
    throw new Error("Required DOM element missing");
  }

  return {
    form,
    formInput,
    todoList,
    todoListItemTemplate,
    clearCompletedButton,
    itemsLeft,
  };
}

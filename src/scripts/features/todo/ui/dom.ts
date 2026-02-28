export type TodoDOM = {
  form: HTMLFormElement;
  formInput: HTMLInputElement;
  todoList: HTMLUListElement;
  todoListItemTemplate: HTMLTemplateElement;
  todoFooter: HTMLElement;
  infoParagraph: HTMLParagraphElement;
  clearCompletedButton: HTMLButtonElement;
  itemsLeft: HTMLParagraphElement;
  filterButtons: NodeListOf<HTMLButtonElement>;
};

export function getTodoDOM() {
  const form = document.querySelector<HTMLFormElement>("#create-todo-form");
  const formInput =
    document.querySelector<HTMLInputElement>("#create-todo-input");
  const todoList = document.querySelector<HTMLUListElement>(".todo-list");
  const todoListItemTemplate = document.querySelector<HTMLTemplateElement>(
    "#todo-list-item-template",
  );
  const todoFooter = document.querySelector<HTMLElement>(".todo-footer");
  const infoParagraph = document.querySelector<HTMLParagraphElement>(".info");
  const clearCompletedButton = document.querySelector<HTMLButtonElement>(
    ".clear-completed-button",
  );
  const itemsLeft = document.querySelector<HTMLParagraphElement>(".items-left");
  const filterButtons =
    document.querySelectorAll<HTMLButtonElement>(".filter-button");

  if (
    !form ||
    !formInput ||
    !todoList ||
    !todoListItemTemplate ||
    !todoFooter ||
    !infoParagraph ||
    !clearCompletedButton ||
    !itemsLeft ||
    filterButtons.length === 0
  ) {
    throw new Error("Required DOM element missing");
  }

  return {
    form,
    formInput,
    todoList,
    todoListItemTemplate,
    todoFooter,
    infoParagraph,
    clearCompletedButton,
    itemsLeft,
    filterButtons,
  };
}

import { initAnimations } from "@shared/animations";
import { initScroll } from "@shared/scroll";
import { initTheme } from "@shared/theme";
import { initTodo } from "./features/todo";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initScroll();
  initTheme();
  initTodo();
});

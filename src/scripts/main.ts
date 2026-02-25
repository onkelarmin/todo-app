import { initAnimations } from "@shared/animations";
import { initScroll } from "@shared/scroll";
import { initTheme } from "@shared/theme";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initScroll();
  initTheme();
});

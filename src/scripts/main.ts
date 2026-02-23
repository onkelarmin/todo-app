import { initAnimations } from "@scripts/features/animations";
import { initLenis } from "@scripts/features/scroll";
import { initThemeSwitch } from "./features/themeSwitch";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initLenis();
  // initThemeSwitch();
});

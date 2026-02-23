import { initAnimations } from "@scripts/features/animations";
import { initLenis } from "@scripts/features/scroll";
import { initMobileNav } from "@scripts/features/nav";
import { initThemeSwitch } from "./features/themeSwitch";

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initLenis();
  initMobileNav();
  initThemeSwitch();
});

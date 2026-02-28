import gsap from "gsap";
import { Flip } from "gsap/all";
import type { TodoDOM } from "./dom";
import type { State } from "../types";
import { render } from "./render";
import { MEDIA } from "@/scripts/shared/animations/media";

gsap.registerPlugin(Flip);

export function renderWithFlip(state: State, dom: TodoDOM) {
  const items = dom.todoList.querySelectorAll<HTMLLIElement>("li[data-id]");

  const flipState = Flip.getState([
    ...items,
    dom.todoFooter,
    dom.infoParagraph,
  ]);

  render(state, dom);

  const mm = gsap.matchMedia();
  mm.add(MEDIA, (context) => {
    const { isMobileP, isMobileL, isTablet, isDesktop, reduceMotion } =
      context.conditions ?? {};
    const { isReverted } = context;

    if (isReverted) return;

    Flip.from(flipState, {
      duration: reduceMotion ? 0 : 0.5,
      ease: "power2.out",
    });
  });
}

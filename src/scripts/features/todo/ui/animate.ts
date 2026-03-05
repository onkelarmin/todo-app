import gsap from "gsap";
import { Flip } from "gsap/all";
import type { TodoDOM } from "./dom";
import type { State } from "../types";
import { render } from "./render";
import { MEDIA } from "@/scripts/shared/animations/media";

gsap.registerPlugin(Flip);

export function createTodoRenderer(dom: TodoDOM) {
  const mm = gsap.matchMedia();

  let reduceMotion = false;

  mm.add(MEDIA, (context) => {
    reduceMotion = !!context.conditions?.reduceMotion;

    return () => {
      reduceMotion = false;
    };
  });

  function renderWithFlip(state: State) {
    const items = Array.from(dom.todoList.querySelectorAll("li[data-id]"));

    const flipState = reduceMotion
      ? null
      : Flip.getState([...items, dom.todoFooter, dom.infoParagraph]);

    render(state, dom);

    if (!flipState) return;

    Flip.from(flipState, {
      duration: 0.5,
      ease: "power2.out",
    });
  }

  function destroy() {
    mm.revert();
  }

  return { render: renderWithFlip, destroy };
}

import { initialState } from "./initialState";
import { reducer } from "./reducer";
import type { Action, State } from "./types";

export function createStore() {
  let state = initialState;
  const listeners = new Set<(s: State) => void>();

  function getState() {
    return state;
  }

  function dispatch(action: Action) {
    const next = reducer(state, action);
    if (next === state) return;
    state = next;
    for (const l of listeners) l(state);
  }

  function subscribe(listener: (s: State) => void) {
    listeners.add(listener);
    listener(state); // initial render
    return () => listeners.delete(listener);
  }

  return { getState, dispatch, subscribe };
}

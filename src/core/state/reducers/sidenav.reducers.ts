import { createReducer, on } from "@ngrx/store";
import { toggle } from "../actions/sidenav.actions";

export const initialState = true;

const _sidenavReducer = createReducer(
  initialState,
  on(toggle, (state) => !state)
);

export function sidenavReducer(state, action) {
  return _sidenavReducer(state, action)
}

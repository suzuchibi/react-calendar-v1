// State Types
export interface State {
  anchorEl: HTMLButtonElement | null;
}

// Types Actions
export const ANCHOR_CHANGE = 'poper/anchorChange';

export interface anchorChange {
  type: typeof ANCHOR_CHANGE;
  payload: HTMLButtonElement | null;
}

export type PoperActionTypes = anchorChange;

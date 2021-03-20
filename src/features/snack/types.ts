// State Types
export interface State {
  open: boolean;
  msg: String;
}

// Types Actions
export const CHANGE_OPEN = 'snac/changeOpen';
export const CHANGE_MSG = 'snac/changeMsg';

export interface changeOpen {
  type: typeof CHANGE_OPEN;
  payload: boolean;
}

export interface changeMsg {
  type: typeof CHANGE_MSG;
  payload: String;
}

export type SnackActionTypes = changeOpen | changeMsg;

// State Types
export interface State {
  isActive: boolean;
  mode: String;
}

// Types Actions
export const MODAL_HANDLE_ISACTIVE = 'modal/handleIsActive';
export const MODAL_HANDLE_MODE = 'modal/handleMode';

export interface handleIsActive {
  type: typeof MODAL_HANDLE_ISACTIVE;
  payload: boolean;
}

export interface handleMode {
  type: typeof MODAL_HANDLE_MODE;
  payload: String;
}

export type ModalActionTypes = handleIsActive | handleMode;

import {
  MODAL_HANDLE_ISACTIVE,
  MODAL_HANDLE_MODE,
  ModalActionTypes,
} from './types';

// Actions
export const handleIsActive = (payload: boolean): ModalActionTypes => ({
  type: MODAL_HANDLE_ISACTIVE,
  payload,
});

export const handleMode = (payload: String): ModalActionTypes => ({
  type: MODAL_HANDLE_MODE,
  payload,
});

import { FORM_HANDLE_ID, FORM_IS_DUPLICATE, FormActionTypes } from './types';

// Actions
export const handleID = (payload: String): FormActionTypes => ({
  type: FORM_HANDLE_ID,
  payload,
});

export const handleDuplicate = (payload: Boolean): FormActionTypes => ({
  type: FORM_IS_DUPLICATE,
  payload,
});

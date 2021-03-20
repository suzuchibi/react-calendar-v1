// State Types
export type State = {
  id: String;
  isDuplicate: Boolean;
};

// Types Actions
export const FORM_HANDLE_ID = 'form/handleID';
export const FORM_IS_DUPLICATE = 'form/handleDuplicate';

export interface handleID {
  type: typeof FORM_HANDLE_ID;
  payload: String;
}

export interface handleDuplicate {
  type: typeof FORM_IS_DUPLICATE;
  payload: Boolean;
}

export type FormActionTypes = handleID | handleDuplicate;

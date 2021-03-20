import {
  State,
  FORM_HANDLE_ID,
  FORM_IS_DUPLICATE,
  FormActionTypes,
} from './types';

const initialState: State = {
  id: '0',
  isDuplicate: false,
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
function formReducer(state = initialState, action: FormActionTypes) {
  switch (action.type) {
    case FORM_HANDLE_ID:
      return {
        ...state,
        id: action.payload,
      };
    case FORM_IS_DUPLICATE:
      return {
        ...state,
        isDuplicate: action.payload,
      };
    default:
      return state;
  }
}

export default formReducer;

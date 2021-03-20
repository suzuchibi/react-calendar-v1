import {
  State,
  MODAL_HANDLE_ISACTIVE,
  MODAL_HANDLE_MODE,
  ModalActionTypes,
} from './types';

const initState: State = {
  isActive: false,
  mode: '0',
};

/**
 * Reducer
 * @param {*} state
 * @param {*} action
 */
function modalReducer(state = initState, action: ModalActionTypes): State {
  switch (action.type) {
    case MODAL_HANDLE_ISACTIVE:
      return {
        ...state,
        isActive: action.payload,
      };
    case MODAL_HANDLE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
}

export default modalReducer;

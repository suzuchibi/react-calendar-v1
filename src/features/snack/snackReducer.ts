import { State, CHANGE_OPEN, CHANGE_MSG, SnackActionTypes } from './types';

const initialState: State = {
  open: false,
  msg: '',
};

const snackReducer = (
  state = initialState,
  action: SnackActionTypes
): State => {
  switch (action.type) {
    case CHANGE_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case CHANGE_MSG:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};
export default snackReducer;

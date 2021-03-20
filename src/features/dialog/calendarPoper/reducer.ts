import { State, ANCHOR_CHANGE, PoperActionTypes } from './types';

const initState: State = {
  anchorEl: null,
};

/**
 * Reducer
 * @param {Boolean} state
 * @param {Object} action
 */
const calendarPoperReducer = (
  state = initState,
  action: PoperActionTypes
): State => {
  switch (action.type) {
    case ANCHOR_CHANGE:
      return {
        ...state,
        anchorEl: action.payload,
      };
    default:
      return state;
  }
};

export default calendarPoperReducer;

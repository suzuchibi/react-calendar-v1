import { SCREEN_CHANGE, DialogActionTypes } from './types';

const initState = false;

/**
 * Reducer
 * @param {Boolean} state
 * @param {Object} action
 * @return {Boolean}
 */
const fullScreenDialogReducer = (
  state = initState,
  action: DialogActionTypes
): Boolean => {
  switch (action.type) {
    case SCREEN_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

export default fullScreenDialogReducer;

/**
 * Handle Full Screen Dialog
 * @param {Boolean} flag
 * @return {Object}
 */
export const handleFullScreenDialog = (flag: Boolean): DialogActionTypes => ({
  type: SCREEN_CHANGE,
  payload: flag,
});

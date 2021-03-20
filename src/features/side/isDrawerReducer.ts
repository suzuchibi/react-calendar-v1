import { State, DRAWER_CHANGE, DrwerActionTypes } from './types';

/**
 * Init State
 */
export const initState: typeof State = false;

/**
 * IsDrawer Reducer
 * @param {Boolean} state
 * @param {Object} action
 * @return {Boolean}
 */
const isDrawerReducer = (
  state = initState,
  action: DrwerActionTypes
): Boolean => {
  switch (action.type) {
    case DRAWER_CHANGE:
      return action.payload;
    default:
      return state;
  }
};

export default isDrawerReducer;

/**
 * Handle Drawer
 * @param {Boolean} flag
 * @return {Object}
 */
export const handleDrawer = (flag: Boolean): DrwerActionTypes => ({
  type: DRAWER_CHANGE,
  payload: flag,
});

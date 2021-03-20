import { HISTORY_CHANGE, changeHistory as ActionTypes } from './types';

/**
 * changeHistory
 * @param {Boolean} payload
 */
export const changeHistory = (payload: Boolean): ActionTypes => ({
  type: HISTORY_CHANGE,
  payload,
});

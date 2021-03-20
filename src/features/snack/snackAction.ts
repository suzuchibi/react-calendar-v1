import {
  CHANGE_OPEN,
  CHANGE_MSG,
  SnackActionTypes as ActionTypes,
} from './types';

/**
 * changeOpen
 * @param {boolean} payload
 */
export const changeOpen = (payload: boolean): ActionTypes => ({
  type: CHANGE_OPEN,
  payload,
});

/**
 * changeMsg
 * @param {String} payload
 */
export const changeMsg = (payload: String): ActionTypes => ({
  type: CHANGE_MSG,
  payload,
});

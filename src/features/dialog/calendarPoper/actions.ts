import { ANCHOR_CHANGE, PoperActionTypes } from './types';

/**
 * Handle Calendar Poper Dialog
 * @param {Boolean} flag
 * @return {Object}
 */
export const handleAnchorEl = (
  ele: HTMLButtonElement | null
): PoperActionTypes => ({
  type: ANCHOR_CHANGE,
  payload: ele,
});

/**
 * Types List
 */

// Types State
export const State = false;

// Types Actions
export const DRAWER_CHANGE = 'drawer/change';

export interface DrwerActionTypes {
  type: typeof DRAWER_CHANGE;
  payload: Boolean;
}

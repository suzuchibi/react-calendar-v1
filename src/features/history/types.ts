// Types Actions
export const HISTORY_CHANGE = 'history/changeHistory';

export interface changeHistory {
  type: typeof HISTORY_CHANGE;
  payload: Boolean;
}

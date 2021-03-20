/**
 * History Reducer
 * ページ切り替えの動作チェック用。
 */
import { HISTORY_CHANGE, changeHistory as ActionTypes } from './types';

const historyReducer = (state = false, action: ActionTypes): Boolean => {
  switch (action.type) {
    case HISTORY_CHANGE:
      return action.payload;
    default:
      return state;
  }
};
export default historyReducer;

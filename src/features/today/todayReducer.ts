/**
 * Today Setting
 * 本日のタイムスタンプを取得する。
 * 時刻は「0時0分00秒」に固定する。
 * 型はNumber。
 */

import { getTime, startOfDay } from 'date-fns';

const start = startOfDay(new Date());
const timeStamp = getTime(start);

const todayReducer = (state = timeStamp) => {
  return state;
};
export default todayReducer;

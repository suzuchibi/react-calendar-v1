import { put, call, takeEvery } from 'redux-saga/effects';
import { CallEffect, PutEffect } from 'redux-saga/effects';
import { Props as SagaProps } from './sagaActions';
import { Holidays } from '../features/calendar/types';
import GAPI from '../api/googleCalendarApi';

import config from '../config/app.json';
import {
  getYear,
  getMonth,
  getDate,
  startOfMonth,
  endOfMonth,
  add,
} from 'date-fns';

export interface ApiProps {
  type: string;
  payload: SagaProps;
}
export interface SuccessProps {
  type: string;
  payload: {
    mode: string;
    result: Array<Holidays>;
  };
}
export interface ErrorProps {
  type: string;
  payload: {
    mode: string;
  };
}
export type SagaTypes = CallEffect | PutEffect;

/**
 * SetDateText タイムゾーンのテキスト化
 * @param {Date | number} e
 * @return {String}
 */
const setTimeText = (e: Date | number) => {
  const pad = (t: number) => ('00' + t).slice(-2);
  return `${getYear(e)}-${pad(getMonth(e) + 1)}-${pad(getDate(e))}T00:00:00Z`;
};

/**
 * GetTimeZone 開始と終了の日付取得
 * @param {number} stamp
 * @param {String} mode
 * @return {Object<{start: String, end: String}>}
 */
const getTimeZone = (stamp: number, mode: String) => {
  switch (mode) {
    case 'cal':
      const s = startOfMonth(stamp);
      const e = endOfMonth(stamp);
      return {
        start: setTimeText(s),
        end: setTimeText(e),
      };
    case 'schedule':
      const dateAddSix = add(stamp, { days: 7 });
      return {
        start: setTimeText(stamp),
        end: setTimeText(dateAddSix),
      };
    case 'all':
      const sAll = startOfMonth(stamp);
      const end = endOfMonth(stamp);
      const endAddSix = add(end, { days: 6 });
      return {
        start: setTimeText(sAll),
        end: setTimeText(endAddSix),
      };
    default:
      return {
        start: '',
        end: '',
      };
  }
};

// ここからジェネレーター

/**
 * Success 成功した後のディスパッチ処理
 * @param {object} payload
 * @returns {void}
 */
export function* success({
  payload,
}: SuccessProps): Generator<PutEffect, void, SuccessProps> {
  const { mode, result } = payload;
  switch (mode) {
    case 'cal':
      yield put({ type: 'calendar/changeHolidays', payload: result });
      yield put({ type: 'calendar/changeStatus', payload: 'loaded' });
      break;
    case 'schedule':
      yield put({ type: 'schedule/changeHolidays', payload: result });
      yield put({ type: 'schedule/changeStatus', payload: 'loaded' });
      break;
    case 'all':
      yield put({ type: 'calendar/changeHolidays', payload: result });
      yield put({ type: 'schedule/changeHolidays', payload: result });
      yield put({ type: 'calendar/changeStatus', payload: 'loaded' });
      yield put({ type: 'schedule/changeStatus', payload: 'loaded' });
      break;
  }
}

/**
 * Error 失敗した後のディスパッチ処理
 * @param {object} payload modeの値が返る
 * @returns {void}
 */
export function* error({
  payload,
}: ErrorProps): Generator<PutEffect, void, string> {
  const { mode } = payload;
  switch (mode) {
    case 'cal':
      yield put({ type: 'calendar/changeHolidays', payload: [] });
      yield put({ type: 'calendar/changeStatus', payload: 'loaded' });
      break;
    case 'schedule':
      yield put({ type: 'schedule/changeHolidays', payload: [] });
      yield put({ type: 'schedule/changeStatus', payload: 'loaded' });
      break;
    case 'all':
      yield put({ type: 'calendar/changeHolidays', payload: [] });
      yield put({ type: 'schedule/changeHolidays', payload: [] });
      yield put({ type: 'calendar/changeStatus', payload: 'loaded' });
      yield put({ type: 'schedule/changeStatus', payload: 'loaded' });
      break;
  }
}

/**
 * Generator GoogleCalendarApi
 * @param {object} payload
 * @returns {void}
 */
export function* googleCalendarApiSaga({
  payload,
}: ApiProps): Generator<SagaTypes, void, any> {
  const { mode, stamp } = payload;
  const { start, end } = getTimeZone(stamp, mode);
  const param = `timeMin=${start}&timeMax=${end}&singleEvents=true`;
  const encode = encodeURIComponent(config.gapiCal.address);
  const path = `${config.gapiCal.gurl}${encode}/events?${param}`;
  try {
    // GoogleCalendarAPIコール
    const result = yield call(GAPI.start, path);
    yield put({
      type: 'app/googleCalendarApiSuccess',
      payload: { mode: mode, result: result },
    });
  } catch (err) {
    yield put({ type: 'snac/changeMsg', payload: err });
    yield put({ type: 'snac/changeOpen', payload: true });
    yield put({
      type: 'app/googleCalendarApiError',
      payload: { mode: mode },
    });
  }
}

export default function* rootSaga() {
  yield takeEvery('app/googleCalendarAPI', googleCalendarApiSaga);
  yield takeEvery('app/googleCalendarApiSuccess', success);
  yield takeEvery('app/googleCalendarApiError', error);
}

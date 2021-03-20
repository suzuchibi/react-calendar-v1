import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../app/reducer';
import {
  CALENDAR_CHANGE_CURRENT,
  CALENDAR_CHANGE_HOLIDAYS,
  CALENDAR_CHANGE_STATUS,
  CalendarActionTypes,
} from '../types';
import googleCalendarApi from '../../../api/googleCalendarApi';

/**
 * changeCurrent
 * @param {number} payload
 */
export const changeCurrent = (payload: number): CalendarActionTypes => ({
  type: CALENDAR_CHANGE_CURRENT,
  payload,
});

/**
 * changeHolidays
 * @param {Array} payload
 */
export const changeHolidays = (
  payload: Array<Object>
): CalendarActionTypes => ({
  type: CALENDAR_CHANGE_HOLIDAYS,
  payload,
});

/**
 * changeStatus
 * @param {String} payload
 */
export const changeStatus = (payload: String): CalendarActionTypes => ({
  type: CALENDAR_CHANGE_STATUS,
  payload,
});

export function asyncGoogleCalendarAction(
  timestamp: number,
  mode: String
): ThunkAction<void, RootState, unknown, Action<string>> {
  return (dispatch) => {
    googleCalendarApi(timestamp, mode, dispatch);
  };
}

import {
  CALENDAR_CHANGE_CURRENT,
  CALENDAR_CHANGE_HOLIDAYS,
  CALENDAR_CHANGE_STATUS,
  CalendarActionTypes,
} from '../types';

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

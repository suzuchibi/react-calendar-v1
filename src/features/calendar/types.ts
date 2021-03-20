/**
 * Types List
 */

// Holidays Type
export type Holidays = {
  date?: String;
  summary?: String;
};

// Types State
export interface State {
  current: number;
  holidays: Array<Holidays>;
  status: String;
}

// Types Actions
export const CALENDAR_CHANGE_CURRENT = 'calendar/changeCurrent';
export const CALENDAR_CHANGE_HOLIDAYS = 'calendar/changeHolidays';
export const CALENDAR_CHANGE_STATUS = 'calendar/changeStatus';

export interface changeCurrent {
  type: typeof CALENDAR_CHANGE_CURRENT;
  payload: number;
}

export interface changeHolidays {
  type: typeof CALENDAR_CHANGE_HOLIDAYS;
  payload: Array<Object>;
}

export interface changeStatus {
  type: typeof CALENDAR_CHANGE_STATUS;
  payload: String;
}

export type CalendarActionTypes = changeCurrent | changeHolidays | changeStatus;

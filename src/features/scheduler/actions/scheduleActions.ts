import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../app/reducer';
import {
  SCHEDULE_CHANGE_SELECTED,
  SCHEDULE_CHANGE_HOLIDAYS,
  SCHEDULE_CHANGE_STATUS,
  ScheduleActionTypes,
} from '../types';
import googleCalendarApi from '../../../api/googleCalendarApi';

export const changeSelected = (payload: number): ScheduleActionTypes => ({
  type: SCHEDULE_CHANGE_SELECTED,
  payload,
});

export const changeHolidays = (
  payload: Array<Object>
): ScheduleActionTypes => ({
  type: SCHEDULE_CHANGE_HOLIDAYS,
  payload,
});

export const changeStatus = (payload: String): ScheduleActionTypes => ({
  type: SCHEDULE_CHANGE_STATUS,
  payload,
});

/*
export const changeWeeks = (payload) => ({
  type: 'schedule/changeWeeks',
  payload,
});
*/

export function asyncGoogleCalendarAction(
  timestamp: number,
  mode: String
): ThunkAction<void, RootState, unknown, Action<string>> {
  return (dispatch) => {
    googleCalendarApi(timestamp, mode, dispatch);
  };
}

import {
  SCHEDULE_CHANGE_SELECTED,
  SCHEDULE_CHANGE_HOLIDAYS,
  SCHEDULE_CHANGE_STATUS,
  ScheduleActionTypes,
} from '../types';

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

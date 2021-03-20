import {
  State,
  CALENDAR_CHANGE_CURRENT,
  CALENDAR_CHANGE_HOLIDAYS,
  CALENDAR_CHANGE_STATUS,
  CalendarActionTypes,
} from './types';
import { getTime, startOfMonth } from 'date-fns';

const start = startOfMonth(new Date());
const timeStamp = getTime(start);
const initialState: State = {
  current: timeStamp,
  holidays: [],
  status: 'idle',
};

/**
 * Calendar Reduder
 * @param state
 * @param action
 */
const calendarReducer = (
  state = initialState,
  action: CalendarActionTypes
): State => {
  switch (action.type) {
    case CALENDAR_CHANGE_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CALENDAR_CHANGE_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload,
      };
    case CALENDAR_CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
export default calendarReducer;

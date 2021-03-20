import {
  State,
  SCHEDULE_CHANGE_SELECTED,
  SCHEDULE_CHANGE_HOLIDAYS,
  SCHEDULE_CHANGE_STATUS,
  ScheduleActionTypes,
} from '../types';
import { getTime, startOfDay } from 'date-fns';

const start = startOfDay(new Date());
const timeStamp = getTime(start);
const initialState: State = {
  //weeks: [],
  holidays: [],
  selected: timeStamp,
  status: 'idle',
};

const scheduleReducer = (
  state = initialState,
  action: ScheduleActionTypes
): State => {
  switch (action.type) {
    case SCHEDULE_CHANGE_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case SCHEDULE_CHANGE_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload,
      };
    case SCHEDULE_CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
export default scheduleReducer;

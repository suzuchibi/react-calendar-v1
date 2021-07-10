import { Holidays } from '../features/calendar/types';

const GOOGLE_CALENDAR_API = 'app/googleCalendarAPI';
const GOOGLE_CALENDAR_API_SUCESS = 'app/googleCalendarApiSuccess';
const GOOGLE_CALENDAR_API_ERROR = 'app/googleCalendarApiError';

export interface Props {
  mode: string;
  stamp: number;
}

export interface GoogleCalendarApiProps {
  type: typeof GOOGLE_CALENDAR_API;
  payload: Props;
}

interface HolidayProps {
  mode: string;
  result: Array<Holidays>;
}

export interface GoogleCalendarApiSuccessProps {
  type: typeof GOOGLE_CALENDAR_API_SUCESS;
  payload: HolidayProps;
}

export interface GoogleCalendarApiErrorProps {
  type: typeof GOOGLE_CALENDAR_API_ERROR;
  payload: {
    mode: string;
  };
}

export type ActionTypes =
  | GoogleCalendarApiProps
  | GoogleCalendarApiSuccessProps
  | GoogleCalendarApiErrorProps;

/**
 * google calendar API saga start
 * @param {object} payload
 */
export const gApiSaga = (payload: Props): ActionTypes => ({
  type: GOOGLE_CALENDAR_API,
  payload,
});

/**
 * Success
 * @param {object} payload
 */
export const gApiSuccess = (payload: HolidayProps): ActionTypes => ({
  type: GOOGLE_CALENDAR_API_SUCESS,
  payload,
});

/**
 * Error
 * @param {object} payload
 */
export const gApiError = (payload: { mode: string }): ActionTypes => ({
  type: GOOGLE_CALENDAR_API_ERROR,
  payload,
});

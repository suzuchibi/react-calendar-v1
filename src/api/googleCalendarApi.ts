import { Dispatch } from 'redux';
import config from '../config/app.json';
import {
  getYear,
  getMonth,
  getDate,
  startOfMonth,
  endOfMonth,
  add,
} from 'date-fns';

// Actions
import {
  changeHolidays as changeCalHolidays,
  changeStatus as changeCalStatus,
} from '../features/calendar/actions/calendarActions';
import {
  changeHolidays as changeScheHolidays,
  changeStatus as changeScheStatus,
} from '../features/scheduler/actions/scheduleActions';
import { changeOpen, changeMsg } from '../features/snack/snackAction';

interface Props {
  start: { date: string };
  summary: String;
}

type ResultProps = [Props];

/**
 * Set Date Text
 * @param {Date | number} e
 * @return {String}
 */
const setDateText = (e: Date | number) => {
  const pad = (t: number) => ('00' + t).slice(-2);
  return `${getYear(e)}-${pad(getMonth(e) + 1)}-${pad(getDate(e))}T00:00:00Z`;
};

/**
 * Init Setting
 * @param {number} timestamp
 * @param {String} mode
 * @return {Object<{start: String, end: String}>}
 */
const init = (timestamp: number, mode: String) => {
  switch (mode) {
    case 'cal':
      const s = startOfMonth(timestamp);
      const e = endOfMonth(timestamp);
      return {
        start: setDateText(s),
        end: setDateText(e),
      };
    case 'schedule':
      const dateAddSix = add(timestamp, { days: 7 });
      return {
        start: setDateText(timestamp),
        end: setDateText(dateAddSix),
      };
    case 'all':
      const sAll = startOfMonth(timestamp);
      const end = endOfMonth(timestamp);
      const endAddSix = add(end, { days: 6 });
      return {
        start: setDateText(sAll),
        end: setDateText(endAddSix),
      };
    default:
      return {
        start: '',
        end: '',
      };
  }
};

/**
 * Request Result Function
 * @param {Array} res
 * @param {String} mode
 * @param {Dispatch} dispatch
 * @return {void}
 */
const requestResult = (res: ResultProps, mode: String, dispatch: Dispatch) => {
  const result = res.map((e: Props) => ({
    date: e.start.date,
    summary: e.summary,
  }));
  switch (mode) {
    case 'cal':
      dispatch(changeCalHolidays(result));
      dispatch(changeCalStatus('loaded'));
      break;
    case 'schedule':
      dispatch(changeScheHolidays(result));
      dispatch(changeScheStatus('loaded'));
      break;
    case 'all':
      dispatch(changeCalHolidays(result));
      dispatch(changeScheHolidays(result));
      dispatch(changeCalStatus('loaded'));
      dispatch(changeScheStatus('loaded'));
      break;
  }
};

/**
 * Request Error Function
 * @param {String} mode
 * @param {Dispatch} dispatch
 * @return {void}
 */
const requestError = (mode: String, dispatch: Dispatch, msg: String) => {
  dispatch(changeMsg(msg));
  dispatch(changeOpen(true));
  switch (mode) {
    case 'cal':
      dispatch(changeCalHolidays([]));
      dispatch(changeCalStatus('loaded'));
      break;
    case 'schedule':
      dispatch(changeScheHolidays([]));
      dispatch(changeScheStatus('loaded'));
      break;
    case 'all':
      dispatch(changeCalHolidays([]));
      dispatch(changeScheHolidays([]));
      dispatch(changeCalStatus('loaded'));
      dispatch(changeScheStatus('loaded'));
      break;
  }
};

/**
 * Main GoogleCalendarApi
 * @param {number} timestamp
 * @param {String} mode
 * @param {Dispatch} dispatch
 * @return {void}
 */
export default function googleCalendarApi(
  timestamp: number,
  mode: String,
  dispatch: Dispatch
) {
  const { start, end } = init(timestamp, mode);
  const param = `timeMin=${start}&timeMax=${end}&singleEvents=true`;
  const encode = encodeURIComponent(config.gapiCal.address);
  const path = `${config.gapiCal.gurl}${encode}/events?${param}`;

  if (window.gapi) {
    window.gapi.load('client', () => {
      window.gapi.client
        .init({ apiKey: config.gapiCal.key })
        .then(() => {
          return gapi.client
            .request({ path: path })
            .then((res) => requestResult(res.result.items, mode, dispatch));
        })
        .catch(() => {
          const msg1 = 'Failed to connected Google Calendar API';
          console.log('Error');
          requestError(mode, dispatch, msg1);
        });
    });
  } else {
    const msg2 = 'Not connected to the internet.';
    requestError(mode, dispatch, msg2);
  }
}

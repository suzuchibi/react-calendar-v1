import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../app/reducer';
import { makeStyles } from '@material-ui/core/styles';
// import { getYear, getMonth, getDate, getTime, add } from 'date-fns';
import ScheduleTimeTableSM from './ScheduleTimeTableSM';
import { getTime, endOfDay, add } from 'date-fns';

// Props
import { Datas } from '../types';

/**
 * CSS Styling
 */
const useStyles = makeStyles(() => ({
  timeWeeks: {
    width: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
}));

/**
 * initDate
 * @param {number} today
 * @param {String} query
 * @return {number}
 */
const initDate = (today: number, query: String | null) => {
  if (query) {
    const split = query.split('-');
    const year = Number(split[0]);
    const month = Number(split[1]) - 1;
    const date = Number(split[2]);
    return getTime(new Date(year, month, date));
  } else {
    return today;
  }
};

/**
 * createWeek
 * @param {number} date
 * @return {Array}
 */
const createWeek = (date: number) => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(getTime(add(new Date(date), { days: i })));
  }
  return week;
};

/**
 * parseDatas
 * @param {Array} week
 * @param {Array} fetch
 * @return {Array}
 */
const parseDatas = (week: Array<number>, fetch: Datas) => {
  return week.map((w) => {
    const start = w;
    const end = getTime(endOfDay(w));
    return fetch.filter((f) => start < f.start && f.start < end);
  });
};

/**
 * Rendar
 */
function ScheduleTimeWeekSM() {
  const classes = useStyles();
  const today = useSelector((state: RootState) => state.today);
  const fetch = useSelector((state: RootState) => state.datas);
  const jHolidays = useSelector((state: RootState) => state.schedule.holidays);
  const query = new URLSearchParams(useLocation().search).get('date');
  const start = initDate(today, query);
  const week = createWeek(start);
  const datas = parseDatas(week, fetch);

  return (
    <div className={classes.timeWeeks}>
      {week.map((v, i) => {
        return (
          <ScheduleTimeTableSM
            stamp={v}
            data={datas[i]}
            holidays={jHolidays}
            index={i}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default ScheduleTimeWeekSM;

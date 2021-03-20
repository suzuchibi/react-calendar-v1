import React from 'react';
import config from '../../../config/app.json';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import ScheduleTimeDataSM from './ScheduleTimeDataSM';
import { getYear, getMonth, getDate, getDay } from 'date-fns';

// Types
import { Datas, Holidays } from '../types';
type Props = {
  stamp: number;
  data?: Datas;
  holidays: Array<Holidays>;
  index: Number;
};

/**
 * CSS Styling
 */
const useStyles = makeStyles(() => ({
  timeTable: {
    width: '100%',
    marginBottom: 16,
    display: 'flex',
    flexWrap: 'wrap',
  },
  timeTableDate: {
    width: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeTableDateTitle: {
    fontSize: '20px',
  },
  timeTableDateDay: {
    fontSize: '16px',
  },
  saturday: {
    color: blue[700],
  },
  sunday: {
    color: red[500],
  },
  jHoliday: {
    color: red[500],
  },
  timeTableDatas: {
    width: 'calc(100% - 80px)',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  timeTableNoData: {
    width: '100%',
    height: '100px',
    borderLeft: 'solid 1px #ccc',
    borderBottom: 'solid 1px #ccc',
    margin: 0,
    padding: 0,
  },
}));

/**
 * Check Japanese Holiday
 * @param {number} stamp
 * @param {Array} holidays
 */
const isJHoliday = (stamp: number, holidays: Array<Holidays>) => {
  let name = null;
  const year = getYear(stamp);
  const month = getMonth(stamp) + 1;
  const day = getDate(stamp);
  const zeroPad = (e: number) => ('00' + e).slice(-2);
  const target = `${year}-${zeroPad(month)}-${zeroPad(day)}`;
  holidays.forEach((v) => {
    if (v.date) {
      if (v.date === target) name = v.summary;
    }
  });
  return name;
};

/**
 * Array Sort ASC
 * @param {Array} datas
 * @return {Array}
 */
const sortAsc = (datas: Datas) => {
  const array = datas.slice();
  array.sort((a, b) => {
    if (a.end < b.end) {
      return -1;
    } else {
      return 1;
    }
  });
  return array;
};

/**
 * Rendar
 * @param {Object} props
 */
function ScheduleTimeTableSM(props: Props) {
  const classes = useStyles();
  const dayOfTheWeek = config.dayOfTheWeek;
  const array = props.data && props.data[0] ? sortAsc(props.data) : [];
  const jHoliday = isJHoliday(props.stamp, props.holidays);
  const month = getMonth(props.stamp) + 1;
  const date = getDate(props.stamp);
  const day = getDay(props.stamp);
  const color = (sum: Number, i: Number) => {
    const count = Math.floor(Number(i) / 3);
    return 3 < sum ? Number(i) - 3 * count : sum;
  };

  return (
    <div className={classes.timeTable}>
      <div
        className={classNames([classes.timeTableDate], {
          [classes.sunday]: day === 0,
          [classes.saturday]: day === 6,
          [classes.jHoliday]: jHoliday !== null,
        })}
      >
        <span className={classes.timeTableDateTitle}>
          {month}/{date}
        </span>
        <span className={classes.timeTableDateDay}>{dayOfTheWeek[day]}</span>
      </div>
      <ul className={classes.timeTableDatas}>
        {props.data && props.data[0] ? (
          array.map((e, i) => (
            <ScheduleTimeDataSM
              data={e}
              color={color(Number(props.index) + i, i)}
              key={i}
            />
          ))
        ) : (
          <li className={classes.timeTableNoData} />
        )}
      </ul>
    </div>
  );
}

export default ScheduleTimeTableSM;

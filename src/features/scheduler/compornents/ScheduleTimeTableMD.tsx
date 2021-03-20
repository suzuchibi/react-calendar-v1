import React from 'react';
import config from '../../../config/app.json';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import ScheduleTimeDataMD from './ScheduleTimeDataMD';
import { getYear, getMonth, getDate, getDay } from 'date-fns';

// Types
import { Holidays, Datas } from '../types';
type Props = {
  stamp: number;
  holidays: Array<Holidays>;
  data?: Datas;
  index: Number;
};

/**
 * CSS Styling
 */
const useStyles = makeStyles(() => ({
  timeTableWrap: {
    width: 'calc(100% / 7)',
    margin: 0,
    padding: 0,
  },
  timeTableTitle: {
    height: '48px',
    textAlign: 'center',
    lineHeight: '1.5em',
    margin: 0,
    padding: '0 0 5px 0',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  timeTableTitleDate: {
    fontSize: '20px',
  },
  timeTableTitleDateDay: {
    fontSize: '12px',
  },
  timeTableHoliday: {
    height: '32px',
    textAlign: 'center',
    borderRight: 'solid 1px #ccc',
    borderBottom: 'solid 1px #ccc',
    display: 'block',
    margin: 0,
    padding: '4px 0 0 0',
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
  jHolidayName: {
    color: red[500],
    fontSize: '12px',
    fontWeight: 800,
    padding: 0,
  },
  timeTableStage: {
    margin: 0,
    padding: 0,
  },
  timeTableItems: {
    position: 'relative',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  timeTableItem: {
    height: '120px',
    borderRight: 'solid 1px #ccc',
    borderBottom: 'solid 1px #ccc',
    margin: 0,
    padding: 0,
  },
}));

/**
 * initTimeLine
 * @return {array}
 */
const initTimeLine = () => {
  const array = [];
  const start = config.startOrder;
  const end = config.lastOrder;
  for (let i = 0; i <= end - start; i++) {
    array.push(start + i);
  }
  return array;
};

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
 * Render
 */
function ScheduleTimeTableMD(props: Props) {
  const classes = useStyles();
  const timeLines = initTimeLine();
  const dayOfTheWeek = config.dayOfTheWeek;
  const jHoliday = isJHoliday(props.stamp, props.holidays);
  const month = getMonth(props.stamp) + 1;
  const date = getDate(props.stamp);
  const day = getDay(props.stamp);
  const color = (sum: Number, i: Number) => {
    const count = Math.floor(Number(i) / 3);
    return 3 < sum ? Number(i) - 3 * count : sum;
  };

  return (
    <dl className={classes.timeTableWrap}>
      <dt
        className={classNames([classes.timeTableTitle], {
          [classes.sunday]: day === 0,
          [classes.saturday]: day === 6,
          [classes.jHoliday]: jHoliday !== null,
        })}
      >
        <span className={classes.timeTableTitleDate}>
          {month}/{date}
        </span>
        <span className={classes.timeTableTitleDateDay}>
          {dayOfTheWeek[day]}
        </span>
      </dt>
      <dd className={classes.timeTableHoliday}>
        <span className={classes.jHolidayName}>{jHoliday}</span>
      </dd>
      <dd className={classes.timeTableStage}>
        <ul className={classes.timeTableItems}>
          {timeLines.map((v) => {
            return <li className={classes.timeTableItem} key={v} />;
          })}
          {props.data &&
            props.data.map((v, i) => {
              return (
                <ScheduleTimeDataMD
                  data={v}
                  color={color(Number(props.index) + i, i)}
                  key={i}
                />
              );
            })}
        </ul>
      </dd>
    </dl>
  );
}

export default ScheduleTimeTableMD;

import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../app/reducer';
import { makeStyles } from '@material-ui/core/styles';
import { getYear, getMonth, getDate, getTime, add } from 'date-fns';

/**
 * CSS Styling
 */
const useStyles = makeStyles((theme) => ({
  titleBox: {
    width: '100%',
    textAlign: 'center',
  },
  titleText: {
    ...theme.typography.h4,
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
 * Week Add Six
 * @param {number} target
 * @return {Object}
 */
const weekAddSix = (start: number) => {
  return getTime(add(new Date(start), { days: 6 }));
};

/**
 * Rendar
 */
export default function Title() {
  const classes = useStyles();
  const today = useSelector((state: RootState) => state.today);
  const query = new URLSearchParams(useLocation().search).get('date');
  const start = initDate(today, query);
  const end = weekAddSix(start);

  return (
    <div className={classes.titleBox}>
      <h1 className={classes.titleText}>
        {getYear(start)}/{getMonth(start) + 1}/{getDate(start)} - {getYear(end)}
        /{getMonth(end) + 1}/{getDate(end)}
      </h1>
    </div>
  );
}

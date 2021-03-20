import React from 'react';
import config from '../../../config/app.json';
import { makeStyles } from '@material-ui/core/styles';

/**
 * CSS Styling
 * @return {object}
 */
const useStyles = makeStyles(() => ({
  timeLineItems: {
    width: `${config.timeLineWidth}px`,
    textAlign: 'right',
    listStyleType: 'none',
    margin: 'auto 0 0 0',
    padding: '0 8px 0 0',
    transform: 'translateY(9px)',
  },
  timeLineItem: {
    height: '120px',
    margin: 0,
    padding: 0,
  },
  timeLineItemLast: {
    height: 'auto',
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
 * Render
 * @params {*}
 */
export default function TimeLine() {
  const classes = useStyles();
  const timeLines = initTimeLine();
  const length = timeLines.length;

  return (
    <ul className={classes.timeLineItems}>
      {timeLines.map((v) => {
        return (
          <li className={classes.timeLineItem} key={v.toString()}>
            {v}:00
          </li>
        );
      })}
      <li className={classes.timeLineItemLast}>
        {timeLines[length - 1] + 1}:00
      </li>
    </ul>
  );
}

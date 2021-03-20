import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ScheduleTimeLine from './ScheduleTimeLine';
import ScheduleTimeWeekMD from './ScheduleTimeWeekMD';
import ScheduleTimeWeekSM from './ScheduleTimeWeekSM';

/**
 * CSS Styling
 * @return {Object}
 */
const useStyles = makeStyles(() => ({
  timeWrapper: {
    width: '100%',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
}));

function ScheduleTimeBreakPoint() {
  const sm = useMediaQuery('(max-width:640px)');
  const classes = useStyles();

  return sm ? (
    <div className={classes.timeWrapper}>
      <ScheduleTimeWeekSM />
    </div>
  ) : (
    <div className={classes.timeWrapper}>
      <ScheduleTimeLine />
      <ScheduleTimeWeekMD />
    </div>
  );
}

export default ScheduleTimeBreakPoint;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../app/reducer';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  getYear,
  getMonth,
  getDate,
  getTime,
  add,
  startOfMonth,
} from 'date-fns';

import {
  changeStatus as changeCalStatus,
  changeCurrent as changeCalCurrent,
} from '../../calendar/actions/calendarActions';
import { changeStatus as changeScheStatus } from '../actions/scheduleActions';

/**
 * CSS Styling
 */
const useStyles = makeStyles((theme: Theme) => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto 24px',
  },
  link: {
    color: theme.palette.primary.main,
    lineHeight: 1,
    textDecoration: 'none',
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
 * Create Buttons
 * @param {number} target
 * @return {Object}
 */
const createButtons = (target: number) => {
  const prev = add(target, { days: -7 });
  const prevText = `${getYear(prev)}-${getMonth(prev) + 1}-${getDate(prev)}`;
  const next = add(target, { days: 7 });
  const nextText = `${getYear(next)}-${getMonth(next) + 1}-${getDate(next)}`;
  return {
    prev: {
      time: getTime(prev),
      link: `/?date=${prevText}`,
    },
    next: {
      time: getTime(next),
      link: `/?date=${nextText}`,
    },
  };
};

/**
 * Rendar
 */
function SelectMenu() {
  const classes = useStyles();
  const current = useSelector((state: RootState) => state.cal.current);
  const today = useSelector((state: RootState) => state.today);
  const query = new URLSearchParams(useLocation().search).get('date');
  const date = initDate(today, query);
  const buttons = createButtons(date);
  const dispatch = useDispatch();
  const history = useHistory();

  // Local Action
  const change = (time: number, link: string) => {
    const after = startOfMonth(time);
    const afterStamp = getTime(after);
    dispatch(changeScheStatus('pending'));
    if (afterStamp !== current) {
      dispatch(changeCalStatus('idle'));
      dispatch(changeCalCurrent(afterStamp));
      dispatch({
        type: 'app/googleCalendarAPI',
        payload: { mode: 'all', stamp: afterStamp },
      });
    } else {
      dispatch({
        type: 'app/googleCalendarAPI',
        payload: { mode: 'all', stamp: time },
      });
    }
    history.push(link);
  };

  return (
    <ButtonGroup className={classes.buttonGroup} color="primary">
      <Button onClick={() => change(today, '/')}>今日</Button>
      <Button onClick={() => change(buttons.prev.time, buttons.prev.link)}>
        <KeyboardArrowLeftIcon />
      </Button>
      <Button onClick={() => change(buttons.next.time, buttons.next.link)}>
        <KeyboardArrowRightIcon />
      </Button>
    </ButtonGroup>
  );
}

export default SelectMenu;

import React from 'react';
import classNames from 'classnames';
import config from '../../../config/app.json';
import { useDispatch } from 'react-redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { getHours, getMinutes } from 'date-fns';
// Actions
import { handleID } from '../../form/actions';
import { handleIsActive, handleMode } from '../../modal/actions';

// Types
import { DataItems } from '../types';
type Props = {
  data: DataItems;
  color: Number;
};

/**
 * CSS Styling
 * @return {object}
 */
const useStyles = makeStyles((theme: Theme) => ({
  timeData: {
    width: 'calc(100% - 4px)',
    color: '#fff',
    background: '#512da8',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transform: 'translateX(1.5px)',
    padding: '2px 4px',
    opacity: 0.75,
    transition: theme.transitions.create(['background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '&:hover': {
      background: '#21066b',
      cursor: 'pointer',
    },
  },
  timeDataTitle: {
    fontSize: '16px',
    textAlign: 'center',
  },
  color0: {
    background: '#1271d6',
    '&:hover': {
      background: '#0050a7',
    },
  },
  color1: {
    background: '#512da8',
    '&:hover': {
      background: '#21066b',
    },
  },
  color2: {
    background: '#00a030',
    '&:hover': {
      background: '#067c29',
    },
  },
  color3: {
    background: '#a730a7',
    '&:hover': {
      background: '#810881',
    },
  },
}));

/**
 * Padding String
 * @param {number} time
 * @return {String}
 */
const pad = (time: number) => ('00' + time).slice(-2);

/**
 * Render
 * @param {*} props
 */
function ScheduleTimeDataMD(props: Props) {
  const classes = useStyles();
  const order = config.startOrder;
  const start = props.data.start;
  const end = props.data.end;
  const minute = getMinutes(end) - getMinutes(start);
  const hours = (getHours(end) - getHours(start)) * 60;
  const height = (hours + minute) * 2 - 1;
  const top = ((getHours(start) - order) * 60 + getMinutes(start)) * 2;

  const dispatch = useDispatch();
  const handleModal = () =>
    dispatch(handleMode(props.data.id)) &&
    dispatch(handleID(props.data.id)) &&
    dispatch(handleIsActive(true));

  return (
    <li
      className={classNames([classes.timeData], {
        [classes.color0]: props.color === 0,
        [classes.color1]: props.color === 1,
        [classes.color2]: props.color === 2,
        [classes.color3]: props.color === 3,
      })}
      style={{ height: `${height}px`, top: `${top}px` }}
      onClick={handleModal}
    >
      <div>{`${getHours(start)}:${pad(getMinutes(start))}`}</div>
      <div className={classes.timeDataTitle}>{props.data.title}</div>
      <div>{`${getHours(end)}:${pad(getMinutes(end))}`}</div>
    </li>
  );
}

export default ScheduleTimeDataMD;

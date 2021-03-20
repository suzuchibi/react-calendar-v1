import React from 'react';
import { useDispatch } from 'react-redux';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { getHours, getMinutes } from 'date-fns';

// Actions
import { handleID } from '../../form/actions';
import { handleMode } from '../../modal/actions';
import { handleFullScreenDialog } from '../../dialog/fullScreen/reducer';

// Types
import { DataItems } from '../types';
type Props = {
  data: DataItems;
  color: Number;
};

/**
 * CSS Styling
 */
const useStyles = makeStyles((theme: Theme) => ({
  timeTableItems: {
    color: '#fff',
    height: '80px',
    borderRadius: 8,
    listStyleType: 'none',
    margin: '0 0 8px 0',
    padding: 0,
    transition: theme.transitions.create(['background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  timeTableItem: {
    height: '100%',
    margin: 0,
    padding: '2px 0',
    display: 'flex',
    flexWrap: 'wrap',
  },
  timeTableItemLeft: {
    width: '64px',
    borderRightWidth: 4,
    borderRightStyle: 'solid',
    padding: '4px 8px 4px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  timeTableItemRight: {
    width: 'calc(100% - 64px)',
    paddingLeft: '8px',
    display: 'flex',
    alignSelf: 'center',
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

function ScheduleTimeDataSM(props: Props) {
  const classes = useStyles();
  const sHours = props.data.start ? getHours(props.data.start) : null;
  const sMinutes = props.data.start ? getMinutes(props.data.start) : null;
  const eHours = props.data.end ? getHours(props.data.end) : null;
  const eMinutes = props.data.end ? getMinutes(props.data.end) : null;
  const zeroPad = (e: number | null) => ('00' + e).slice(-2);

  const dispatch = useDispatch();
  const handleScreenDialog = () => {
    dispatch(handleMode(props.data.id));
    dispatch(handleID(props.data.id));
    dispatch(handleFullScreenDialog(true));
  };
  // console.log(props.color);

  return (
    <li
      className={classNames([classes.timeTableItems], {
        [classes.color0]: props.color === 0,
        [classes.color1]: props.color === 1,
        [classes.color2]: props.color === 2,
        [classes.color3]: props.color === 3,
      })}
      onClick={handleScreenDialog}
    >
      <div className={classes.timeTableItem}>
        <div className={classes.timeTableItemLeft}>
          <span>
            {sHours}:{zeroPad(sMinutes)}
          </span>
          <span>
            {eHours}:{zeroPad(eMinutes)}
          </span>
        </div>
        <div className={classes.timeTableItemRight}>{props.data.title}</div>
      </div>
    </li>
  );
}

export default ScheduleTimeDataSM;

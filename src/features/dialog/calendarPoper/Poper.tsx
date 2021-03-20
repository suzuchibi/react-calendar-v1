import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/reducer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Calendar from '../../calendar/compornents/Calendar';

// Actions
import { handleAnchorEl } from './actions';

/**
 * CSS Styling
 * @param {Theme} theme
 */
const useStyles = makeStyles((theme: Theme) => ({
  pager: {
    width: '240px',
    padding: theme.spacing(1),
  },
}));

function Poper() {
  const classes = useStyles();
  const anchor = useSelector((state: RootState) => state.calPoper.anchorEl);
  const open = Boolean(anchor);

  const dispatch = useDispatch();
  const close = () => dispatch(handleAnchorEl(null));

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className={classes.pager}>
        <Calendar />
      </div>
    </Popover>
  );
}

export default Poper;

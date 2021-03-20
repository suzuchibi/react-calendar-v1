import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import config from '../../config/app.json';
import { RootState } from '../../app/reducer';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Poper from '../dialog/calendarPoper/Poper';
// Actions
import { handleID } from '../form/actions';
import { handleMode } from '../modal/actions';
import { handleDrawer } from '../side/isDrawerReducer';
import { handleAnchorEl } from '../dialog/calendarPoper/actions';
import { handleFullScreenDialog } from '../dialog/fullScreen/reducer';

const drawerWidth = config.drawerWidth;

/**
 * CSS Styling
 * @param {Theme} theme
 * @return {Object}
 */
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    color: '#000',
    background: '#fff',
    boxShadow: '0 3px 5px 0 rgba(0, 0, 0, .1)',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: '100%',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolbar: {
    padding: '0 0 0 4px',
  },
  menuIconMd: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuIconSm: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

/**
 * React Props Type
 */
type MenuIconPropsType = { isDrawer: boolean };

/**
 * MenuIconCompornents
 * @param {Object} props
 * @return {FC}
 */
const MenuIconCompornents: FC<MenuIconPropsType> = (props) => {
  return props.isDrawer ? <ListIcon /> : <ArrowBackIcon />;
};

/**
 * Render
 */
const Header: FC = () => {
  const classes = useStyles();
  const isActive = useSelector((state: RootState) => state.drawer);

  const dispatch = useDispatch();
  const change = () => dispatch(handleDrawer(!isActive));
  const changeCal = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(handleAnchorEl(e.currentTarget));
  };
  const changeScreen = () => {
    dispatch(handleMode('0'));
    dispatch(handleID('0'));
    dispatch(handleFullScreenDialog(true));
  };

  return (
    <AppBar
      className={classNames([classes.appBar], {
        [classes.appBarShift]: !isActive,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.menuIconMd}>
          <IconButton onClick={change}>
            <MenuIconCompornents isDrawer={isActive} />
          </IconButton>
        </div>
        <div className={classes.menuIconSm}>
          <IconButton onClick={changeCal}>
            <CalendarTodayIcon />
          </IconButton>
          <IconButton onClick={changeScreen}>
            <AddIcon />
          </IconButton>
        </div>
        <Poper />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

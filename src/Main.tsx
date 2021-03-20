import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import config from './config/app.json';
import { RootState } from './app/reducer';
import Scheduler from './features/scheduler/compornents/Scheduler';
import Footer from './features/footer/Footer';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = config.drawerWidth;

/**
 * CSS Styling
 * @param {Theme} theme
 */
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  boxShift: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  boxSpacer: {
    width: 0,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  boxSpacerShift: {
    width: 0,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
  },
}));

/**
 * Render
 */
function Main() {
  const classes = useStyles();
  const isActive = useSelector((state: RootState) => state.drawer);
  return (
    <div className={classes.wrapper}>
      <div
        className={classNames([classes.boxSpacer], {
          [classes.boxSpacerShift]: !isActive,
        })}
      />
      <div
        className={classNames([classes.box], {
          [classes.boxShift]: !isActive,
        })}
      >
        <main className={classes.main}>
          <Toolbar />
          <Scheduler />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Main;

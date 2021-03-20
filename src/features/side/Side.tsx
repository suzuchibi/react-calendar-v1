import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import config from '../../config/app.json';
import { RootState } from '../../app/reducer';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Drawer, List, Divider } from '@material-ui/core';
import Calendar from '../calendar/compornents/Calendar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';

// Actions
import { handleID } from '../form/actions';
import { handleIsActive, handleMode } from '../modal/actions';
import { handleDrawer } from './isDrawerReducer';

const drawerWidth = config.drawerWidth;

/**
 * CSS Styling
 * @return {Object}
 */
const useStyles = makeStyles(() => ({
  drawerWrapper: {
    position: 'relative',
  },
  sideTitle: {
    lineHeight: '1.8em',
    paddingTop: '4px',
  },
  listWrapper: {
    width: drawerWidth,
  },
  centerMargin: {
    display: 'flex',
    margin: '0 auto',
  },
  addButton: {
    color: '#fff',
    background: green[600],
    '&:hover': {
      background: green[800],
    },
  },
}));

/**
 * Render
 */
const Side: FC = () => {
  const classes = useStyles();
  const isDrawer = useSelector((state: RootState) => state.drawer);
  const md = useMediaQuery('(max-width:960px)');
  const sm = useMediaQuery('(max-width:600px)');

  const dispatch = useDispatch();
  const close = () => dispatch(handleDrawer(!isDrawer));
  const handleModal = () =>
    dispatch(handleMode('0')) &&
    dispatch(handleID('0')) &&
    dispatch(handleIsActive(true));
  const variantMode = (flag: Boolean) => {
    return flag ? 'temporary' : 'persistent';
  };
  const isDrawerDevice = () => {
    return sm ? false : !isDrawer;
  };

  return (
    <Drawer
      className={classes.drawerWrapper}
      variant={variantMode(md)}
      anchor="left"
      open={isDrawerDevice()}
      onClose={close}
    >
      <List className={classes.listWrapper}>
        <ListSubheader className={classes.sideTitle}>Calender</ListSubheader>
        <ListItem>
          <Calendar md={md} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            <Button
              aria-label="add"
              variant="contained"
              className={classNames([classes.centerMargin, classes.addButton])}
              startIcon={<AddIcon />}
              disableElevation
              onClick={handleModal}
            >
              新規登録
            </Button>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Side;

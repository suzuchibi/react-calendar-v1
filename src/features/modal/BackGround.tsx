import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(() => ({
  backDrop: {
    background: 'rgba(0, 0, 0, 0.7)',
    // background: 'rgba(255, 255, 255, 0.8)',
  },
}));

export default function BackGround() {
  const classes = useStyles();
  return <Backdrop className={classes.backDrop} open />;
}

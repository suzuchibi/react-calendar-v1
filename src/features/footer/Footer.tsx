import React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  footer: {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    marginTop: 'auto',
  },
  footerText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

/**
 * Render
 */
export default function Footer() {
  const classes = useStyles();
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <p className={classes.footerText}>
        <CopyrightIcon style={{ fontSize: 12, marginRight: 2 }} /> {year}{' '}
        TimeTable-Scheduler v1
      </p>
    </footer>
  );
}

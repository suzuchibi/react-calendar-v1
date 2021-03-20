import React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, StyleRules, createStyles } from '@material-ui/core';
import Title from './Title';
import SelectMenu from './SelectMenu';
import ScheduleTimeLoad from '../containers/ScheduleTimeLoad';

/**
 * CSS Styling
 * @param {Theme} theme
 */
const useStyles = (theme: Theme): StyleRules =>
  createStyles({
    container: {
      paddingTop: theme.spacing(2),
      paddingLeft: 0,
      paddingRight: 0,
      [theme.breakpoints.up(641)]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  });

/**
 * Props
 */
type Props = WithStyles<typeof useStyles>;

/**
 * Rendar
 */
class Scheduler extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Title />
        <SelectMenu />
        <ScheduleTimeLoad />
      </div>
    );
  }
}

export default withStyles(useStyles)(Scheduler);

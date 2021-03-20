import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import DayOfTheWeek from './DayOfTheWeek';
import TitleAndPrevNext from '../containers/TitleAndPrevNext';
import CalendarLoad from '../containers/CalendarLoad';

/**
 * CSS Styling
 */
const useStyles = createStyles({
  cal: {
    width: '100%',
    margin: '0 0 8px 0',
  },
  calBox: {
    width: '100%',
  },
});

interface Props extends WithStyles<typeof useStyles> {
  md?: boolean;
}

class Calendar extends React.Component<Props> {
  render() {
    const { classes, md } = this.props;
    return (
      <div className={classes.cal}>
        <TitleAndPrevNext />
        <div className={classes.calBox}>
          <DayOfTheWeek />
          <CalendarLoad md={md} />
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(Calendar);

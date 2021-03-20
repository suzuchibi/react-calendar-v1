import React from 'react';
import classnames from 'classnames';
import config from '../../../config/app.json';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

/**
 * CSS Styling
 */
const useStyles = createStyles({
  calWeek: {
    width: '100%',
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  calWeekList: {
    width: 'calc(100% / 7)',
    textAlign: 'center',
    lineHeight: '2.0em',
  },
  sunday: {
    color: red[500],
  },
  saturday: {
    color: blue[700],
  },
});

// interface Props extends WithStyles<typeof useStyles> {}
type Props = WithStyles<typeof useStyles>;

/**
 * Render
 */
class dayOfTheWeek extends React.Component<Props> {
  render() {
    const week = [0, 1, 2, 3, 4, 5, 6];
    const { classes } = this.props;

    return (
      <ul className={classes.calWeek}>
        {week.map((value) => {
          return (
            <li
              className={classnames([classes.calWeekList], {
                [classes.sunday]: value === 0,
                [classes.saturday]: value === 6,
              })}
              key={value}
            >
              {config.dayOfTheWeek[value]}
            </li>
          );
        })}
      </ul>
    );
  }
}
export default withStyles(useStyles)(dayOfTheWeek);

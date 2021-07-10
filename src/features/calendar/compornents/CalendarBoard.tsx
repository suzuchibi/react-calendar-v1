import React from 'react';
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connectProps } from '../containers/CalendarBoard';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { WithStyles, StyleRules, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import createCalendar from '../utils/createCalendar';

const useStyles = (theme: Theme): StyleRules =>
  createStyles({
    calBox: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
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
    calLink: {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
      borderRadius: 50,
      display: 'block',
      transition: theme.transitions.create(['background'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      '&:hover': {
        cursor: 'pointer',
        background: 'rgba(0, 0, 0, 0.1)',
      },
    },
    today: {
      fontWeight: 'bold',
    },
    selected: {
      background: 'rgba(0, 0, 0, 0.1)',
    },
    saturday: {
      color: blue[700],
    },
    sunday: {
      color: red[500],
    },
    holiday: {
      color: red[500],
    },
    glayText: {
      color: '#aaa',
    },
  });

type GetProps = { md?: boolean };
type Props = WithStyles<typeof useStyles> &
  connectProps &
  RouteComponentProps &
  GetProps;

class CalendarBoard extends React.Component<Props> {
  private click(target: string, stamp: number | undefined, md?: boolean) {
    if (stamp) {
      this.props.changeSchedule('pending');
      this.props.asyncGoogleApiSaga('schedule', stamp);
      if (md) this.props.handleDrawer(true);
      if (this.props.anchor !== null) this.props.changeAnchor(null);
      this.props.history.push(target);
    }
  }
  render() {
    const { classes, current, today, holidays, selected, md } = this.props;
    const calendar = createCalendar(current, holidays, today, selected);
    return (
      <div className={classes.calBox}>
        {calendar.map((value, index) => {
          return (
            <ul className={classes.calWeek} key={index}>
              {value.map(
                (
                  v: {
                    type?: String;
                    value?: Number;
                    link?: String;
                    jHoliday?: Boolean;
                    isToday?: Boolean;
                    isSelected?: Boolean;
                    timeStamp?: number;
                  },
                  i
                ) => {
                  if (v.type === 'gray') {
                    return (
                      <li
                        className={classNames([
                          classes.calWeekList,
                          classes.glayText,
                        ])}
                        key={i}
                      >
                        {v.value}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        onClick={() =>
                          this.click(`/?date=${v.link}`, v.timeStamp, md)
                        }
                        key={i}
                        className={classNames(
                          [classes.calWeekList],
                          [classes.calLink],
                          {
                            [classes.sunday]: v.type === 'sunday',
                            [classes.saturday]: v.type === 'saturday',
                            [classes.holiday]: v.jHoliday,
                            [classes.today]: v.isToday,
                            [classes.selected]: v.isSelected,
                          }
                        )}
                      >
                        {v.value}
                      </li>
                    );
                  }
                }
              )}
            </ul>
          );
        })}
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles)(CalendarBoard));

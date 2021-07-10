import React from 'react';
import config from '../../../config/app.json';
import { connectProps } from '../containers/ScheduleTimeLoad';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import queryString from 'query-string';
import ScheduleTimeBreakPoint from './ScheduleTimeBreakPoint';
import indigo from '@material-ui/core/colors/indigo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getTime } from 'date-fns';

/**
 * CSS Styling
 * @param {Theme} theme
 */
const useStyles = () =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: '16px',
      display: 'flex',
      justifyContent: 'center',
    },
    timeWrapper: {
      width: '100%',
      display: 'flex',
      margin: 0,
      padding: 0,
    },
    timeTable: {
      width: `calc(100% - ${config.timeLineWidth}px)`,
      display: 'flex',
      margin: 0,
      padding: 0,
    },
  });

type Props = WithStyles<typeof useStyles> & connectProps & RouteComponentProps;

class ScheduleTimeLoad extends React.Component<Props> {
  private checkDate(query: string) {
    if (query) {
      const date = query.split('-');
      const year = Number(date[0]);
      const month = Number(date[1]);
      const day = Number(date[2]);
      return getTime(new Date(year, month - 1, day));
    } else {
      return this.props.today;
    }
  }

  private init() {
    const qs: { date?: string } = queryString.parse(this.props.location.search);
    if (qs.date) {
      const timeStamp = this.checkDate(qs.date);
      return timeStamp;
    } else {
      return this.props.today;
    }
  }

  componentDidMount() {
    const timeStamp = this.init();
    this.props.changeSelected(timeStamp);
    // if (this.props.status !== 'idle') {
    if (this.props.status === 'idle') {
      this.props.asyncGoogleApiSaga('schedule', timeStamp);
    }
  }

  componentDidUpdate() {
    // if (this.props.status === 'idle') {
    if (this.props.status !== 'idle') {
      const timeStamp = this.init();
      this.props.changeSelected(timeStamp);
    }
  }

  render() {
    const { classes } = this.props;
    // return this.props.status !== 'idle' || this.props.status === 'pending' ? (
    return this.props.status === 'idle' || this.props.status === 'pending' ? (
      <div className={classes.root}>
        <CircularProgress style={{ color: indigo[300] }} />
      </div>
    ) : (
      <ScheduleTimeBreakPoint />
    );
  }
}

export default withRouter(withStyles(useStyles)(ScheduleTimeLoad));

import React from 'react';
import queryString from 'query-string';
import { connectProps } from '../containers/CalendarLoad';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { WithStyles, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CalendarBoard from '../containers/CalendarBoard';
import CircularProgress from '@material-ui/core/CircularProgress';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { getTime } from 'date-fns';

const useStyles = createStyles({
  root: {
    width: '100%',
    height: '124px',
    display: 'flex',
    marginBottom: '16px',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type GetProps = { md?: boolean };
type Props = WithStyles<typeof useStyles> &
  connectProps &
  RouteComponentProps &
  GetProps;
type LocalState = { status: String };

class CalendarLoad extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: this.props.status,
    };
  }

  private init(query: string) {
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

  componentDidMount() {
    const object: { date?: string } = queryString.parse(
      this.props.location.search
    );
    if (object.date) {
      const after = this.init(object.date);
      this.props.changeCurrent(after);
      this.props.asyncGoogleCalendar(after, 'cal');
    } else {
      if (this.state.status === 'idle') {
        const { current } = this.props;
        this.props.asyncGoogleCalendar(current, 'cal');
      }
    }
  }

  render() {
    const { classes, status, md } = this.props;
    return status === 'idle' ? (
      <div className={classes.root}>
        <CircularProgress size={20} style={{ color: blueGrey[300] }} />
      </div>
    ) : (
      <CalendarBoard md={md} />
    );
  }
}

export default withRouter(withStyles(useStyles)(CalendarLoad));

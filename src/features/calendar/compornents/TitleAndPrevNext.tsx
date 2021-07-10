import React from 'react';
import { connectProps } from '../containers/TitleAndPrevNext';
import { WithStyles, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { getTime, getYear, getMonth, addMonths } from 'date-fns';

/**
 * CSS Styling
 */
const useStyles = createStyles({
  calNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 5px 0',
  },
  calNavJweek: {
    fontSize: '12px',
  },
});

// interface Props extends WithStyles<typeof useStyles> {}
type Props = WithStyles<typeof useStyles> & connectProps;

/**
 * Render
 */
class TitleAndPrevNext extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    const { current } = this.props;
    const prevTimeStamp = getTime(addMonths(current, -1));
    this.props.changeStatus('idle');
    this.props.changeCurrent(prevTimeStamp);
    this.props.asyncGoogleApiSaga('cal', prevTimeStamp);
  }

  next() {
    const { current } = this.props;
    const nextTimeStamp = getTime(addMonths(current, 1));
    this.props.changeStatus('idle');
    this.props.changeCurrent(nextTimeStamp);
    this.props.asyncGoogleApiSaga('cal', nextTimeStamp);
  }

  render() {
    const { classes, current } = this.props;
    const year = getYear(current);
    const month = getMonth(current);
    const jType = 'ja-JP-u-ca-japanese';
    const jYear = (y: number, m: number) => {
      return new Date(y, m, 1).toLocaleDateString(jType, { year: 'numeric' });
    };
    const zeroPad = (e: Number) => ('00' + e).slice(-2);

    return (
      <div className={classes.calNav}>
        <IconButton size="small" onClick={this.prev}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography>
          {year}{' '}
          <span className={classes.calNavJweek}>({jYear(year, month)})</span> /{' '}
          {zeroPad(month + 1)}
        </Typography>
        <IconButton size="small" onClick={this.next}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(useStyles)(TitleAndPrevNext);

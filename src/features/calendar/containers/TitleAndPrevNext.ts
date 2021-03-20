import { ThunkDispatch } from 'redux-thunk';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/reducer';
import TitleAndPrevNext from '../compornents/TitleAndPrevNext';

// Actions
import {
  changeCurrent,
  changeStatus,
  asyncGoogleCalendarAction,
} from '../actions/calendarActions';
import { CalendarActionTypes } from '../types';

// Combine Types
type ActionTypes = CalendarActionTypes;

const mapStateToProps = (state: RootState) => {
  return {
    current: state.cal.current,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, ActionTypes>
) => {
  return {
    changeCurrent(event: number) {
      dispatch(changeCurrent(event));
    },
    changeStatus(event: String) {
      dispatch(changeStatus(event));
    },
    asyncGoogleCalendar(stamp: number, mode: String) {
      dispatch(asyncGoogleCalendarAction(stamp, mode));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(TitleAndPrevNext);

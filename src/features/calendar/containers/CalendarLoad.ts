import { ThunkDispatch } from 'redux-thunk';
import { connect, ConnectedProps } from 'react-redux';
import CalendarLoad from '../compornents/CalendarLoad';
import { RootState } from '../../../app/reducer';

// Actions
import { CalendarActionTypes } from '../types';
import {
  changeStatus,
  changeCurrent,
  asyncGoogleCalendarAction,
} from '../actions/calendarActions';

// Combine Types
type ActionTypes = CalendarActionTypes;

const mapStateToProps = (state: RootState) => {
  return {
    today: state.today,
    current: state.cal.current,
    status: state.cal.status,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, ActionTypes>
) => {
  return {
    changeStatus(event: String) {
      dispatch(changeStatus(event));
    },
    changeCurrent(event: number) {
      dispatch(changeCurrent(event));
    },
    asyncGoogleCalendar(stamp: number, mode: String) {
      dispatch(asyncGoogleCalendarAction(stamp, mode));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(CalendarLoad);

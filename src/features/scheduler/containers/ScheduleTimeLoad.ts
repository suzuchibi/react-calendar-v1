// import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect, ConnectedProps } from 'react-redux';
import ScheduleTimeLoad from '../compornents/ScheduleTimeLoad';
import { RootState } from '../../../app/reducer';

// Actions
import { ScheduleActionTypes as ActionTypes } from '../types';
import {
  changeStatus,
  changeSelected,
  asyncGoogleCalendarAction,
} from '../actions/scheduleActions';

const mapStateToProps = (state: RootState) => {
  return {
    today: state.today,
    status: state.schedule.status,
    select: state.schedule.selected,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, ActionTypes>
) => {
  return {
    changeStatus(event: String) {
      dispatch(changeStatus(event));
    },
    changeSelected(event: number) {
      dispatch(changeSelected(event));
    },
    asyncGoogleCalendar(stamp: number, mode: String) {
      dispatch(asyncGoogleCalendarAction(stamp, mode));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTimeLoad);

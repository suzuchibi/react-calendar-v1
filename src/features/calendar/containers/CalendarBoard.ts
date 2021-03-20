import { ThunkDispatch } from 'redux-thunk';
import { connect, ConnectedProps } from 'react-redux';
import CalendarBoard from '../compornents/CalendarBoard';
import { RootState } from '../../../app/reducer';

// Actions
import { changeStatus as changeSchedule } from '../../scheduler/actions/scheduleActions';
import { asyncGoogleCalendarAction } from '../actions/calendarActions';
import { ScheduleActionTypes } from '../../scheduler/types';
import { handleAnchorEl as changeAnchor } from '../../dialog/calendarPoper/actions';
import { PoperActionTypes } from '../../dialog/calendarPoper/types';
import { handleDrawer } from '../../side/isDrawerReducer';
import { DrwerActionTypes } from '../../side/types';

// Combine Types
type ActionTypes = ScheduleActionTypes | PoperActionTypes | DrwerActionTypes;

const mapStateToProps = (state: RootState) => {
  return {
    today: state.today,
    current: state.cal.current,
    holidays: state.cal.holidays,
    selected: state.schedule.selected,
    anchor: state.calPoper.anchorEl,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, ActionTypes>
) => {
  return {
    changeSchedule(event: String) {
      dispatch(changeSchedule(event));
    },
    changeAnchor(event: HTMLButtonElement | null) {
      dispatch(changeAnchor(event));
    },
    handleDrawer(flag: Boolean) {
      dispatch(handleDrawer(flag));
    },
    asyncGoogleCalendar(stamp: number, mode: String) {
      dispatch(asyncGoogleCalendarAction(stamp, mode));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(CalendarBoard);

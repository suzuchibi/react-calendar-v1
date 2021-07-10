import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import CalendarBoard from '../compornents/CalendarBoard';
import { RootState } from '../../../app/reducer';

// Actions
import { changeStatus as changeSchedule } from '../../scheduler/actions/scheduleActions';
import { handleAnchorEl as changeAnchor } from '../../dialog/calendarPoper/actions';
import { handleDrawer } from '../../side/isDrawerReducer';
import { gApiSaga } from '../../../app/sagaActions';

const mapStateToProps = (state: RootState) => {
  return {
    today: state.today,
    current: state.cal.current,
    holidays: state.cal.holidays,
    selected: state.schedule.selected,
    anchor: state.calPoper.anchorEl,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
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
    asyncGoogleApiSaga(mode: string, stamp: number) {
      dispatch(gApiSaga({ mode, stamp }));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(CalendarBoard);

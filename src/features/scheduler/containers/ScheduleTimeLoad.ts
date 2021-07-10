import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import ScheduleTimeLoad from '../compornents/ScheduleTimeLoad';
import { RootState } from '../../../app/reducer';

// Actions
import { changeStatus, changeSelected } from '../actions/scheduleActions';
import { gApiSaga } from '../../../app/sagaActions';

const mapStateToProps = (state: RootState) => {
  return {
    today: state.today,
    status: state.schedule.status,
    select: state.schedule.selected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeStatus(event: String) {
      dispatch(changeStatus(event));
    },
    changeSelected(event: number) {
      dispatch(changeSelected(event));
    },
    asyncGoogleApiSaga(mode: string, stamp: number) {
      dispatch(gApiSaga({ mode, stamp }));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTimeLoad);

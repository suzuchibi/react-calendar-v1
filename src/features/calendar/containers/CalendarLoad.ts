import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import CalendarLoad from '../compornents/CalendarLoad';
import { RootState } from '../../../app/reducer';

// Actions
import { changeStatus, changeCurrent } from '../actions/calendarActions';
import { gApiSaga } from '../../../app/sagaActions';

const mapStateToProps = (state: RootState) => {
  return {
    today: state.today,
    current: state.cal.current,
    status: state.cal.status,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeStatus(event: String) {
      dispatch(changeStatus(event));
    },
    changeCurrent(event: number) {
      dispatch(changeCurrent(event));
    },
    asyncGoogleApiSaga(mode: string, stamp: number) {
      dispatch(gApiSaga({ mode, stamp }));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(CalendarLoad);

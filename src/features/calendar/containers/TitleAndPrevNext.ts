import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../app/reducer';
import TitleAndPrevNext from '../compornents/TitleAndPrevNext';

// Actions
import { changeCurrent, changeStatus } from '../actions/calendarActions';
import { gApiSaga } from '../../../app/sagaActions';

const mapStateToProps = (state: RootState) => {
  return {
    current: state.cal.current,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeCurrent(event: number) {
      dispatch(changeCurrent(event));
    },
    changeStatus(event: String) {
      dispatch(changeStatus(event));
    },
    asyncGoogleApiSaga(mode: string, stamp: number) {
      dispatch(gApiSaga({ mode, stamp }));
    },
  };
};

const connecter = connect(mapStateToProps, mapDispatchToProps);
export type connectProps = ConnectedProps<typeof connecter>;
export default connect(mapStateToProps, mapDispatchToProps)(TitleAndPrevNext);

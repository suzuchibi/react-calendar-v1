import { combineReducers } from 'redux';
import isDrawerReducer from '../features/side/isDrawerReducer';
import todayReducer from '../features/today/todayReducer';
import modalReducer from '../features/modal/reducer';
import formReducer from '../features/form/reducer';
import calendarReducer from '../features/calendar/calendarReducer';
import calendarPoperReducer from '../features/dialog/calendarPoper/reducer';
import scheduleReducer from '../features/scheduler/reducers/scheduleReducer';
import scheduleDatasReducer from '../features/scheduler/reducers/datasReducer';
import fullScreenDialogReducer from '../features/dialog/fullScreen/reducer';
import snackReducer from '../features/snack/snackReducer';

const rootReducer = combineReducers({
  drawer: isDrawerReducer,
  today: todayReducer,
  modal: modalReducer,
  form: formReducer,
  cal: calendarReducer,
  calPoper: calendarPoperReducer,
  schedule: scheduleReducer,
  datas: scheduleDatasReducer,
  screen: fullScreenDialogReducer,
  snack: snackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

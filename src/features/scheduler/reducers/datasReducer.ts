import { fakes } from '../fakes';
import {
  Datas,
  DataItems,
  DATAS_ADDED,
  DATAS_UPDATED,
  DATAS_REMOVED,
  DatasActionTypes,
} from '../types';

const add = (array: Datas, item: DataItems) => {
  return array.concat(item);
};

const scheduleDatasReducer = (
  state = fakes,
  action: DatasActionTypes
): Datas => {
  switch (action.type) {
    case DATAS_ADDED:
      return add(state, action.payload);
    case DATAS_UPDATED:
      return state.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    case DATAS_REMOVED:
      return state.filter((ele) => ele.id !== action.payload);
    default:
      return state;
  }
};
export default scheduleDatasReducer;

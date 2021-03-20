// Datas Type
export type DataItems = {
  id: String;
  title: String;
  coment: String;
  start: number;
  end: number;
  delete?: Boolean;
};
export type Datas = Array<DataItems>;

// Holidays Type
export type Holidays = {
  date?: String;
  summary?: String;
};

// State Types
export interface State {
  selected: number;
  holidays: Array<Holidays>;
  status: String;
}

// Types Actions
export const DATAS_ADDED = 'datas/postAdded';
export const DATAS_UPDATED = 'datas/postUpdated';
export const DATAS_REMOVED = 'datas/postRemoved';
export const SCHEDULE_CHANGE_SELECTED = 'schedule/changeSelected';
export const SCHEDULE_CHANGE_HOLIDAYS = 'schedule/changeHolidays';
export const SCHEDULE_CHANGE_STATUS = 'schedule/changeStatus';

export interface postAdded {
  type: typeof DATAS_ADDED;
  payload: DataItems;
}

export interface postUpdated {
  type: typeof DATAS_UPDATED;
  payload: DataItems;
}

export interface postRemoved {
  type: typeof DATAS_REMOVED;
  payload: String;
}

export type DatasActionTypes = postAdded | postUpdated | postRemoved;

export interface changeSelected {
  type: typeof SCHEDULE_CHANGE_SELECTED;
  payload: number;
}

export interface changeHolidays {
  type: typeof SCHEDULE_CHANGE_HOLIDAYS;
  payload: Array<Object>;
}

export interface changeStatus {
  type: typeof SCHEDULE_CHANGE_STATUS;
  payload: String;
}

export type ScheduleActionTypes =
  | changeSelected
  | changeHolidays
  | changeStatus;

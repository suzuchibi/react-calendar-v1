import configureMockStore from 'redux-mock-store';
const mock = configureMockStore();

export const mockStore = mock({
  drawer: false,
  today: 1626015600000,
  modal: {
    isActive: false,
    mode: '0',
  },
  form: {
    id: '0',
    isDuplicate: false,
  },
  cal: {
    current: 1625065200000,
    holidays: [
      {
        date: '2021-07-22',
        summary: '海の日',
      },
    ],
    status: 'loaded',
  },
  calPoper: {
    anchorEl: null,
  },
  schedule: {
    holidays: [],
    selected: 1626015600000,
    status: 'loaded',
  },
  datas: [
    {
      id: '1',
      title: 'タイトル1',
      coment: 'コメント1',
      start: 1626139200000,
      end: 1626141600000,
    },
  ],
  screen: false,
  snack: {
    open: false,
    msg: '',
  },
});

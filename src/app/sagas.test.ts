import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { googleCalendarApiSaga, success, error } from './sagas';

// Termial
// yarn test src/app/sagas.test.ts

describe('非同期API コールテスト', () => {
  const param = {
    type: 'app/googleCalendarAPI',
    payload: {
      mode: 'cal',
      stamp: 1626274800000,
    },
  };
  const mockApi = () => '';

  it('テストからwindowオブジェクトにアクセスできないのでエラーが返る', () => {
    return expectSaga(googleCalendarApiSaga, param)
      .provide([[call(mockApi), '']])
      .put({ type: 'snac/changeMsg', payload: 'Failed to connected Internet' })
      .put({ type: 'snac/changeOpen', payload: true })
      .put({ type: 'app/googleCalendarApiError', payload: { mode: 'cal' } })
      .run();
  });
});

describe('Redux-saga コール後のテスト', () => {
  it('Success処理周り', () => {
    const sParam = {
      type: 'app/googleCalendarApiSuccess',
      payload: {
        mode: 'cal',
        result: [
          {
            date: '2021-01-01',
            summary: '元旦',
          },
        ],
      },
    };
    const result = [
      {
        date: '2021-01-01',
        summary: '元旦',
      },
    ];
    return expectSaga(success, sParam)
      .put({ type: 'calendar/changeHolidays', payload: result })
      .put({ type: 'calendar/changeStatus', payload: 'loaded' })
      .run();
  });

  it('Error処理周り', () => {
    const eParam = {
      type: 'app/googleCalendarApiError',
      payload: {
        mode: 'cal',
      },
    };
    return expectSaga(error, eParam)
      .put({ type: 'calendar/changeHolidays', payload: [] })
      .put({ type: 'calendar/changeStatus', payload: 'loaded' })
      .run();
  });
});

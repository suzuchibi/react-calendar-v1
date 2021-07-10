import { gApiSaga, gApiSuccess, gApiError } from './sagaActions';

// Termial
// yarn test src/app/sagaActions.test.ts

describe('Saga Actions Test', () => {
  it('Saga実行のトリガーとなるアクション', () => {
    const result = gApiSaga({ mode: 'cal', stamp: 123 });
    // 期待値
    const expected = {
      type: 'app/googleCalendarAPI',
      payload: {
        mode: 'cal',
        stamp: 123,
      },
    };
    expect(result).toEqual(expected);
  });

  it('Sagaで実行したGoogleAPIが成功したときのアクション', () => {
    const result = gApiSuccess({
      mode: 'cal',
      result: [
        {
          date: '2021-01-01',
          summary: '元旦',
        },
      ],
    });
    // 期待値
    const expected = {
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
    expect(result).toEqual(expected);
  });

  it('Sagaで実行したGoogleAPIが失敗したときのアクション', () => {
    const result = gApiError({ mode: 'cal' });
    // 期待値
    const expected = {
      type: 'app/googleCalendarApiError',
      payload: {
        mode: 'cal',
      },
    };
    expect(result).toEqual(expected);
  });
});

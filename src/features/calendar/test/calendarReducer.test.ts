import calendarReducer from '../calendarReducer';

// Termial
// yarn test src/features/calendar/test/calendarReducer.test.ts

describe('CalendarReducer テスト', () => {
  it('ChangeCurrent テスト', () => {
    const state = {
      current: 123,
      holidays: [],
      status: 'idle',
    };
    // Action 実行
    const result = calendarReducer(state, {
      type: 'calendar/changeCurrent',
      payload: 456,
    });
    // 期待値
    const expected = {
      current: 456,
      holidays: [],
      status: 'idle',
    };
    expect(result).toEqual(expected);
  });

  it('ChangeHolidays テスト', () => {
    const state = {
      current: 123,
      holidays: [],
      status: 'idle',
    };
    // Action 実行
    const result = calendarReducer(state, {
      type: 'calendar/changeHolidays',
      payload: [
        {
          date: '2021-1-1',
          summary: '元旦',
        },
      ],
    });
    // 期待値
    const expected = {
      current: 123,
      holidays: [
        {
          date: '2021-1-1',
          summary: '元旦',
        },
      ],
      status: 'idle',
    };
    expect(result).toEqual(expected);
  });

  it('ChangeStatus テスト', () => {
    const state = {
      current: 123,
      holidays: [],
      status: 'idle',
    };
    // Action 実行
    const result = calendarReducer(state, {
      type: 'calendar/changeStatus',
      payload: 'loaded',
    });
    // 期待値
    const expected = {
      current: 123,
      holidays: [],
      status: 'loaded',
    };
    expect(result).toEqual(expected);
  });
});

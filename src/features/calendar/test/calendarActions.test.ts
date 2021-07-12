import {
  changeCurrent,
  changeHolidays,
  changeStatus,
} from '../actions/calendarActions';

// Termial
// yarn test src/features/calendar/test/calendarActions.test.ts

describe('CalendarAction テスト', () => {
  it('ChangeCurrent テスト', () => {
    const result = changeCurrent(100);
    // 期待値
    const expected = {
      type: 'calendar/changeCurrent',
      payload: 100,
    };

    expect(result).toEqual(expected);
  });

  it('ChangeHolidays テスト', () => {
    const result = changeHolidays([
      {
        date: '2021-1-1',
        summary: '元旦',
      },
    ]);
    // 期待値
    const expected = {
      type: 'calendar/changeHolidays',
      payload: [
        {
          date: '2021-1-1',
          summary: '元旦',
        },
      ],
    };

    expect(result).toEqual(expected);
  });

  it('ChangeStatus テスト', () => {
    const result = changeStatus('loaded');
    // 期待値
    const expected = {
      type: 'calendar/changeStatus',
      payload: 'loaded',
    };

    expect(result).toEqual(expected);
  });
});

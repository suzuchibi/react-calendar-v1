import {
  changeSelected,
  changeHolidays,
  changeStatus,
} from '../actions/scheduleActions';

// Termial
// yarn test src/features/scheduler/test/scheduleActions.test.ts

describe('ScheduleAction Test', () => {
  it('ChangeSelected テスト', () => {
    const result = changeSelected(1999);
    // 期待値
    const expected = {
      type: 'schedule/changeSelected',
      payload: 1999,
    };

    expect(result).toEqual(expected);
  });

  it('ChangeHolidays テスト', () => {
    const result = changeHolidays([{}]);
    // 期待値
    const expected = {
      type: 'schedule/changeHolidays',
      payload: [{}],
    };

    expect(result).toEqual(expected);
  });

  it('ChangeStatus テスト', () => {
    const result = changeStatus('load');
    // 期待値
    const expected = {
      type: 'schedule/changeStatus',
      payload: 'load',
    };

    expect(result).toEqual(expected);
  });
});

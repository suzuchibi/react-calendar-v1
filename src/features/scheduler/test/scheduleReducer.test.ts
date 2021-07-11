import scheduleReducer from '../reducers/scheduleReducer';

// Termial
// yarn test src/features/scheduler/test/scheduleReducer.test.ts

describe('ScheduleReducer Test', () => {
  it('Change Holidays', () => {
    const state = {
      holidays: [],
      selected: 100,
      status: 'idle',
    };
    // Action 実行
    const result = scheduleReducer(state, {
      type: 'schedule/changeHolidays',
      payload: [{}],
    });
    // 期待値
    const expected = {
      holidays: [{}],
      selected: 100,
      status: 'idle',
    };
    expect(result).toEqual(expected);
  });

  it('Change Selected', () => {
    const state = {
      holidays: [],
      selected: 100,
      status: 'idle',
    };
    // Action 実行
    const result = scheduleReducer(state, {
      type: 'schedule/changeSelected',
      payload: 200,
    });
    // 期待値
    const expected = {
      holidays: [],
      selected: 200,
      status: 'idle',
    };
    expect(result).toEqual(expected);
  });

  it('Change Status', () => {
    const state = {
      holidays: [],
      selected: 100,
      status: 'idle',
    };
    // Action 実行
    const result = scheduleReducer(state, {
      type: 'schedule/changeStatus',
      payload: 'loaded',
    });
    // 期待値
    const expected = {
      holidays: [],
      selected: 100,
      status: 'loaded',
    };
    expect(result).toEqual(expected);
  });
});

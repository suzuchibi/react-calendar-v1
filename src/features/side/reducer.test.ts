import isDrawerReducer from './isDrawerReducer';

describe('Reducer Test', () => {
  test('Init', () => {
    const state = false;
    const result = isDrawerReducer(state, {
      type: 'drawer/change',
      payload: true,
    });
    // 真偽判定のため今回は不要。
    // const check = true;
    expect(result).toBeTruthy();
  });
});

import isDrawerReducer from './isDrawerReducer';

// Termial
// yarn test src/features/side/reducer.test.ts

describe('Side Reducer Test', () => {
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

import { handleDrawer } from './isDrawerReducer';

// Termial
// yarn test src/features/side/action.test.ts

describe('Action Test', () => {
  it('Handle Drawer テスト', () => {
    const result = handleDrawer(true);
    // 期待値
    const expected = {
      type: 'drawer/change',
      payload: true,
    };

    expect(result).toEqual(expected);
  });
});

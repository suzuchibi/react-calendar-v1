import { handleDrawer } from './isDrawerReducer';

describe('Action Test', () => {
  test('Handle Drawer テスト', () => {
    const result = handleDrawer(true);
    const check = {
      type: 'drawer/change',
      payload: true,
    };

    // test
    expect(result).toEqual(check);
  });
});

import snackReducer from '../snackReducer';

// Termial
// yarn test src/features/snack/test/snackReducer.test.ts

describe('SnackReducer Test', () => {
  it('Dispatch ChangeOpen Action', () => {
    const state = {
      open: true,
      msg: 'Test',
    };
    // Action 実行
    const result = snackReducer(state, {
      type: 'snac/changeOpen',
      payload: false,
    });
    // 期待値
    const expected = {
      open: false,
      msg: 'Test',
    };
    expect(result).toEqual(expected);
  });

  it('Dispatch ChangeMSG Action', () => {
    const state = {
      open: false,
      msg: 'Test',
    };
    // Action 実行
    const result = snackReducer(state, {
      type: 'snac/changeMsg',
      payload: 'OK',
    });
    // 期待値
    const expected = {
      open: false,
      msg: 'OK',
    };
    expect(result).toEqual(expected);
  });
});

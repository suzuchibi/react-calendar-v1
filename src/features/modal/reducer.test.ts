import modalReducer from './reducer';

// Termial
// yarn test src/features/modal/reducer.test.ts

describe('ModalReducer テスト', () => {
  it('isActive テスト', () => {
    const state = {
      isActive: false,
      mode: '0',
    };
    // Action 実行
    const result = modalReducer(state, {
      type: 'modal/handleIsActive',
      payload: true,
    });
    // 期待値
    const expected = {
      isActive: true,
      mode: '0',
    };
    expect(result).toEqual(expected);
  });

  it('HandleMode テスト', () => {
    const state = {
      isActive: false,
      mode: '0',
    };
    // Action 実行
    const result = modalReducer(state, {
      type: 'modal/handleMode',
      payload: '1',
    });
    // 期待値
    const expected = {
      isActive: false,
      mode: '1',
    };
    expect(result).toEqual(expected);
  });
});

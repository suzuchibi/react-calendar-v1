import formReducer from '../reducer';

// Termial
// yarn test src/features/form/test/reducer.test.ts

describe('FormReducer テスト', () => {
  it('HandleID テスト', () => {
    const state = {
      id: '0',
      isDuplicate: false,
    };
    // Action 実行
    const result = formReducer(state, {
      type: 'form/handleID',
      payload: '1',
    });
    // 期待値
    const expected = {
      id: '1',
      isDuplicate: false,
    };
    expect(result).toEqual(expected);
  });

  it('HandleDuplicate テスト', () => {
    const state = {
      id: '0',
      isDuplicate: false,
    };
    // Action 実行
    const result = formReducer(state, {
      type: 'form/handleDuplicate',
      payload: true,
    });
    // 期待値
    const expected = {
      id: '0',
      isDuplicate: true,
    };
    expect(result).toEqual(expected);
  });
});

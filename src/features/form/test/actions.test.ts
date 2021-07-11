import { handleID, handleDuplicate } from '../actions';

// Termial
// yarn test src/features/form/test/actions.test.ts

describe('FormAction テスト', () => {
  it('HandleID テスト', () => {
    const result = handleID('1');
    // 期待値
    const expected = {
      type: 'form/handleID',
      payload: '1',
    };

    expect(result).toEqual(expected);
  });

  it('HandleDuplicate テスト', () => {
    const result = handleDuplicate(false);
    // 期待値
    const expected = {
      type: 'form/handleDuplicate',
      payload: false,
    };

    expect(result).toEqual(expected);
  });
});

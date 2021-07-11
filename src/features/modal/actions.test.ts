import { handleIsActive, handleMode } from './actions';

// Termial
// yarn test src/features/modal/actions.test.ts

describe('ModalAction Test', () => {
  it('HandleIsActive テスト', () => {
    const result = handleIsActive(true);
    // 期待値
    const expected = {
      type: 'modal/handleIsActive',
      payload: true,
    };

    expect(result).toEqual(expected);
  });

  it('HandleMode テスト', () => {
    const result = handleMode('1');
    // 期待値
    const expected = {
      type: 'modal/handleMode',
      payload: '1',
    };

    expect(result).toEqual(expected);
  });
});

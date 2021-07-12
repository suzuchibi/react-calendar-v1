import { postRemoved } from '../actions/datasActions';

// Termial
// yarn test src/features/scheduler/test/datasActions.test.ts

describe('DatasAction Test', () => {
  it('PostRemoved テスト', () => {
    const result = postRemoved('Removed');
    // 期待値
    const expected = {
      type: 'datas/postRemoved',
      payload: 'Removed',
    };

    expect(result).toEqual(expected);
  });
});

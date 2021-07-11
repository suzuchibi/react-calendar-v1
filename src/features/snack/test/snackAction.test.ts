import { changeOpen, changeMsg } from '../snackAction';

// Termial
// yarn test src/features/snack/test/snackAction.test.ts

describe('SnackAction Test', () => {
  it('Change Open テスト', () => {
    const result = changeOpen(true);
    // 期待値
    const expected = {
      type: 'snac/changeOpen',
      payload: true,
    };

    expect(result).toEqual(expected);
  });

  it('Change Msg テスト', () => {
    const result = changeMsg('Message');
    // 期待値
    const expected = {
      type: 'snac/changeMsg',
      payload: 'Message',
    };

    expect(result).toEqual(expected);
  });
});

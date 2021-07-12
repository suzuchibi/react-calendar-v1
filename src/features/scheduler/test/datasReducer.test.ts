import datasReducer from '../reducers/datasReducer';

// Termial
// yarn test src/features/scheduler/test/datasReducer.test.ts

describe('SnackReducer Test', () => {
  it('Dispatch Add Action', () => {
    const state = [
      {
        id: '1',
        title: 'タイトル1',
        coment: 'コメント１',
        start: 100,
        end: 200,
      },
    ];
    // Action 実行
    const result = datasReducer(state, {
      type: 'datas/postAdded',
      payload: {
        id: '2',
        title: 'タイトル2',
        coment: 'コメント2',
        start: 100,
        end: 200,
      },
    });
    // 期待値
    const expected = [
      {
        id: '1',
        title: 'タイトル1',
        coment: 'コメント１',
        start: 100,
        end: 200,
      },
      {
        id: '2',
        title: 'タイトル2',
        coment: 'コメント2',
        start: 100,
        end: 200,
      },
    ];
    expect(result).toEqual(expected);
  });

  it('Dispatch Updated Action', () => {
    const state = [
      {
        id: '1',
        title: 'タイトル1',
        coment: 'コメント１',
        start: 100,
        end: 100,
      },
      {
        id: '2',
        title: 'タイトル2',
        coment: 'コメント2',
        start: 200,
        end: 200,
      },
    ];
    // Action 実行
    const result = datasReducer(state, {
      type: 'datas/postUpdated',
      payload: {
        id: '2',
        title: 'タイトル22',
        coment: 'コメント22',
        start: 222,
        end: 222,
      },
    });
    // 期待値
    const expected = [
      {
        id: '1',
        title: 'タイトル1',
        coment: 'コメント１',
        start: 100,
        end: 100,
      },
      {
        id: '2',
        title: 'タイトル22',
        coment: 'コメント22',
        start: 222,
        end: 222,
      },
    ];
    expect(result).toEqual(expected);
  });

  it('Dispatch Removed Action', () => {
    const state = [
      {
        id: '1',
        title: 'タイトル1',
        coment: 'コメント１',
        start: 100,
        end: 100,
      },
      {
        id: '2',
        title: 'タイトル2',
        coment: 'コメント2',
        start: 200,
        end: 200,
      },
    ];
    // Action 実行
    const result = datasReducer(state, {
      type: 'datas/postRemoved',
      payload: '2',
    });
    // 期待値
    const expected = [
      {
        id: '1',
        title: 'タイトル1',
        coment: 'コメント１',
        start: 100,
        end: 100,
      },
    ];
    expect(result).toEqual(expected);
  });
});

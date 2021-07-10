import GAPI from './googleCalendarApi';

// Termial
// yarn test src/api/gapi.test.ts

describe('API テスト', () => {
  it('テストからwindowオブジェクトにアクセスできないためエラーが返る', () => {
    return expect(GAPI.start('')).rejects.toMatch(
      'Failed to connected Internet'
    );
  });
});

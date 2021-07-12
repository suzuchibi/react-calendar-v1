import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import TitleAndPrevNext from '../containers/TitleAndPrevNext';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/calendar/test/TitleAndPrevNext.test.ts

describe('<TitleAndPrevNext>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TitleAndPrevNext />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

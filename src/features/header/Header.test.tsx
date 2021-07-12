import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Header from './Header';

import { mockStore as store } from '../../app/mockStore';

// Termial
// yarn test src/features/header/Header.test.ts

describe('<Header>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

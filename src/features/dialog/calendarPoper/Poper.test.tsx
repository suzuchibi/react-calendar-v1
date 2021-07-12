import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Poper from './Poper';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/dialog/calendarPoper/Poper.test.ts

describe('<Popper>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Poper />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Side from './Side';

import { mockStore as store } from '../../app/mockStore';

// Termial
// yarn test src/features/side/Side.test.ts

describe('<Side>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Side />
        </MemoryRouter>
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

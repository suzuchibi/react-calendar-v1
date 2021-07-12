import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import SnackAlert from '../SnackAlert';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/snack/test/SnackAlert.test.ts

describe('<SnackAlert>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SnackAlert />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

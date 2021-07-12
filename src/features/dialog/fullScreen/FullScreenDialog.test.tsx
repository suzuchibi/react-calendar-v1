import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import FullScreenDialog from './FullScreenDialog';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/dialog/fullScreen/FullScreenDialog.test.ts

describe('<FullScreenDialog>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <FullScreenDialog />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

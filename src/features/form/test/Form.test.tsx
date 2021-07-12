import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Form from '../Form';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/form/test/Form.test.ts

describe('<Form>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

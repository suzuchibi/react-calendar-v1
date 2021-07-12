import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import CalendarBoard from '../containers/CalendarBoard';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/calendar/test/CalendarBoard.test.ts

describe('<CalendarBoard>', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CalendarBoard />
        </MemoryRouter>
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

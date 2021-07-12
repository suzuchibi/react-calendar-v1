import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import ScheduleTimeTableSM from '../compornents/ScheduleTimeTableSM';

import { mockStore as store } from '../../../app/mockStore';

// Termial
// yarn test src/features/scheduler/test/ScheduleTimeTableSM.test.tsx

describe('<ScheduleTimeTableSM>', () => {
  const props = {
    stamp: 1626015600000,
    data: [
      {
        id: '3',
        title: 'タイトル3',
        coment: 'コメント３',
        start: 1626235200000,
        end: 1626242400000,
      },
    ],
    holidays: [],
    index: 0,
    key: 0,
  };
  it('スナップショット テスト', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ScheduleTimeTableSM {...props} />
      </Provider>
    );
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

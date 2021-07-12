import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

// Termial
// yarn test src/features/footer/Footer.test.ts

describe('Footer Snapshot', () => {
  it('スナップショット テスト', () => {
    const { asFragment } = render(<Footer />);
    // snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});

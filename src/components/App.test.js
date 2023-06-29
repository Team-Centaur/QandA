import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

describe('App component', () => {
  it('Should render loading... while waiting for data', () => {
    render(<App />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
});

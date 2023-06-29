/**
 * @jest-environment jsdom
 */
// tells jest to mock document and window

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewHelpfulness from './ReviewHelpfulness';

it('displays helpfulness prop in button', () => {
  render(<ReviewHelpfulness reviewHelpfulness={12} />)
  const helpfulElement = screen.getByRole('button', {name: 'Yes (12)'});
  expect(helpfulElement).toBeInTheDocument();
});
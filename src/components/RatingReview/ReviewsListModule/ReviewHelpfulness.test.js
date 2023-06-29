/**
 * @jest-environment jsdom
 */
// tells jest to mock document and window

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReviewHelpfulness from './ReviewHelpfulness';
// takes prop reviewHelpfulness (number) and
test('increments helpfuless score on button click', () => {
  const reviewHelpfulness = 12;
  render(<ReviewHelpfulness reviewHelpfulness={reviewHelpfulness} />)
  const helpfulElement = screen.getByRole('button');
  expect(helpfulElement).toBeInTheDocument();

});
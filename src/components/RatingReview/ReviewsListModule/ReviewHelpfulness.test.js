/**
 * @jest-environment jsdom
 */
// tells jest to mock document and window

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ReviewHelpfulness from './ReviewHelpfulness';

it('displays helpfulness prop in button', () => {
  render(<ReviewHelpfulness reviewHelpfulness={12} />)
  const helpfulElement = screen.getByRole('button', {name: 'Yes (12)'});
  expect(helpfulElement).toBeInTheDocument();
});


// TODO: Write test to check that helpfulness count increments on button click

// it('increments helpfulness count on button click', () => {
//   render(<ReviewHelpfulness reviewHelpfulness={12} />)
//   // ReviewHelpfulness accepts event handler to update count **
//   const helpfulElement = screen.getByRole('button', {name: 'Yes (12)'});
//   fireEvent.click(helpfulElement);
//   helpfulElement = screen.getByRole('button', {name: 'Yes (13)'});
//   expect(helpfulElement).toBeInTheDocument();
// });


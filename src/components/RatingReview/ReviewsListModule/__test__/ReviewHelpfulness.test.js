import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReviewHelpfulness from '../ReviewHelpfulness';

describe('Review helpfulness', () => {
  const updateHelpfulness = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(
        <ReviewHelpfulness
          reviewHelpfulness={5}
          updateHelpfulness={updateHelpfulness}
        />
      );
    });
  });

  it('should display helpfulness score in button', () => {
    let helpfulComponent = screen.getByRole('button', {name: 'Yes (5)'});
    expect(helpfulComponent).toBeInTheDocument();
  });

  it('should call function to update helpfulness on button click', () => {
    let helpfulComponent = screen.getByRole('button', {name: 'Yes (5)'});
    fireEvent.click(helpfulComponent);
    expect(updateHelpfulness).toHaveBeenCalledTimes(1);
  });
});
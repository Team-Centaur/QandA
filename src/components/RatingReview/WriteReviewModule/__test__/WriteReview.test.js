import React from 'react';
import { createPortal } from 'react-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import WriteReview from '../WriteReview.jsx';
import { characteristics } from '../../../../../__mocks__/reviewMetadataMock.js';

describe('Write Review', () => {

  beforeEach(async () => {
    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', 'portal');
    const portalRoot = document.body.appendChild(portalContainer);
    render(<WriteReview characteristics={characteristics} />)
  });

  afterEach(async () => {
    const portalRoot = document.getElementById('portal');
    portalRoot.remove();
  })

  it('renders NewReviewForm on click of "Write a review" button', async () => {
    const writeReviewButton = await screen.findByRole('button', {name: 'Write a review'});
    expect(writeReviewButton).toBeInTheDocument();
    fireEvent.click(writeReviewButton);
    const form = await screen.findByTestId('newReviewForm');
    expect(form).toBeInTheDocument();
  });

});
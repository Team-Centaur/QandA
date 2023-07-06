import React from 'react';
import { createPortal } from 'react-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReviewImageModal from '../ReviewImageModal.jsx';
import { results } from '../../../../../__mocks__/reviewsMock.js';

describe('Review Image Modal', () => {
  const reviews = results[0]
  const onClose = jest.fn();
  const photoMock = "https://images.unsplash.com/photo-1534481909716-9a482087f27d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80";
  console.log(reviews.photos);

  beforeEach(async () => {
    await act(async () => {
      const portalContainer = document.createElement('div');
      portalContainer.setAttribute('id', 'portal');
      const portalRoot = document.body.appendChild(portalContainer);
      render(<ReviewImageModal onClose={onClose} photo={photoMock}/>, {container: portalRoot})
    })
  });

  afterEach(async () => {
    await act(async () => {
      const portalRoot = document.getElementById('portal');
      portalRoot.remove();
    })
  })

  it('renders component with createPortal', async () => {
    await act(async () => {
      const image = await screen.findByRole('img');
      expect(image).toBeInTheDocument();
    })
  })
});

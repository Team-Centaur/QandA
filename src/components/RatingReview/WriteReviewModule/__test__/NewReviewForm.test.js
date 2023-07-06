import React from 'react';
import { createPortal } from 'react-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NewReviewForm from '../NewReviewForm.jsx';
import { characteristics } from '../../../../../__mocks__/reviewMetadataMock.js';

describe('New Review Form', () => {
  const onCloseMock = jest.fn();
  const product_idMock = 44044;

  beforeEach(async () => {
    await act(async () => {
      const portalContainer = document.createElement('div');
      portalContainer.setAttribute('id', 'portal');
      const portalRoot = document.body.appendChild(portalContainer);
      render(<NewReviewForm onClose={onCloseMock} characteristics={characteristics} product_id={product_idMock}/>);
    })
  });

  afterEach(async () => {
    await act(async() => {
      const portalRoot = document.getElementById('portal');
      portalRoot.remove();
    });
  })

  it('renders component with createPortal', async () => {
    await act(async() => {
      const form = await screen.findByTestId('newReviewForm');
      expect(form).toBeInTheDocument();
    });
  });


  it('renders radio button input for each characteristic of product', async () => {
    await act(async () => {
      const characteristicElements = await screen.findAllByTestId('characteristicInput');
      expect(characteristicElements).toHaveLength(Object.keys(characteristics).length);
    });
  });

});
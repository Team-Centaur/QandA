import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RecommendedItems from '../RecommendedItems';
import getRelatedItemsById from '../../../../helperFunctions/App/getRelatedItemsById';

// Mock the helper functions
jest.mock('../../../../helperFunctions/App/getRelatedItemsById', () => {
  return jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve([41006, 40400, 41197, 41107, 40412])
    );
});

// Mock the child Card component
jest.mock('../Card/Card', () => {
  return ({ productID, setCurrId }) => (
    <div data-testid="card" onClick={() => setCurrId(productID)}>
      {productID}
    </div>
  );
});

describe('RecommendedItems component', () => {
  const setCurrId = jest.fn();
  const currItem = {
    id: 41095,
    campus: 'hr-rfp',
    name: 'Dovie Socks',
    slogan: 'Dolores eos ea quod reprehenderit quos.',
    description:
      'Illum id labore est in provident molestias libero optio. Sunt beatae quaerat corrupti repudiandae. Iusto et eaque sed non.',
    category: 'Socks',
    default_price: '380.00',
    created_at: '2021-08-13T14:38:44.588Z',
    updated_at: '2021-08-13T14:38:44.588Z',
    features: [
      {
        feature: 'Non-GMO',
        value: null,
      },
      {
        feature: 'Lens',
        value: '"Ultrasheen Basic"',
      },
      {
        feature: 'Fabric',
        value: '"Velvet"',
      },
      {
        feature: 'Cut',
        value: '"Skinny"',
      },
    ],
  };

  beforeEach(() => {
    render(<RecommendedItems currItem={currItem} setCurrId={setCurrId} />);
  });

  test('renders Loading message when fetching data', () => {
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders the Cards after fetching data', async () => {
    const cardElements = await screen.findAllByTestId('card');
    expect(cardElements).toHaveLength(5);
  });

  test('calls setCurrId when a Card is clicked', async () => {
    // Define what the mock should return

    const card = await screen.findAllByTestId('card');

    // Simulate a click event on the first Card
    fireEvent.click(card[0]);

    // Check that setCurrId has been called with the right id
    expect(setCurrId).toHaveBeenCalledTimes(1);
  });

  test('renders a right arrow button', async () => {
    const rightButton = await screen.findByRole('button', {
      name: /right-scroll/i,
    });
    expect(rightButton).toBeInTheDocument();
  });

  //   test('renders a left arrow button after the right arrow button is clicked', async () => {
  //     const rightButton = await screen.findByRole('button', {
  //       name: /right-scroll/i,
  //     });
  //     fireEvent.click(rightButton);
  //     const leftButton = await screen.findByRole('button', {
  //       name: /left-scroll/i,
  //     });
  //   });
});

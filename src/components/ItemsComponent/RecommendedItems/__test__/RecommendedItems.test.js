import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecommendedItems from '../RecommendedItems';
import CurrContext from '../../../../store/curr-item-context';
import mockCurrContet from '../../../../../__mocks__/contextMocks/mockCurrContet';

const renderWithProviders = (component, products) => {
  return render(
    <CurrContext.Provider value={products}>{component}</CurrContext.Provider>
  );
};

// Mock the helper functions
jest.mock('../../../../helperFunctions/App/getRelatedItemsById', () => {
  return jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve([41006, 40400, 41197, 41107, 40412])
    );
});

const mockRef = {
  current: {
    scrollTo: jest.fn(),
  },
};

// Mock the child Card component
jest.mock('../Card/Card', () => {
  return ({ productID, setCurrId }) => (
    <div
      data-testid="card"
      style={{ width: '225px' }}
      onClick={() => mockSetCurrItem(productID)}
    >
      {productID}
    </div>
  );
});

const mockSetCurrItem = jest.fn();

describe('RecommendedItems component', () => {
  // const setCurrId = jest.fn();

  beforeEach(async () => {
    jest.spyOn(React, 'useRef').mockReturnValue(mockRef);
    await act(async () =>
      renderWithProviders(
        <RecommendedItems
          setOpenModal={jest.fn()}
          setRelatedItemData={jest.fn()}
        />,
        { ...mockCurrContet, setCurrItem: mockSetCurrItem }
      )
    );
  });

  it('renders Loading message when fetching data', () => {
    renderWithProviders(
      <RecommendedItems setOpenModal={jest.fn()} />,
      mockCurrContet
    );
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders the Cards after fetching data', async () => {
    await act(async () => {
      const cardElements = await screen.findAllByTestId('card');
      expect(cardElements).toHaveLength(5);
    });
  });

  it('calls setCurrId when a Card is clicked', async () => {
    await act(async () => {
      const card = await screen.findAllByTestId('card');

      // Simulate a click event on the first Card
      fireEvent.click(card[0]);

      // Check that setCurrId has been called with the right id
      expect(mockSetCurrItem).toHaveBeenCalledTimes(1);
    });
  });

  it('renders a right arrow button', async () => {
    await act(async () => {
      const rightButton = await screen.findByRole('button', {
        name: /Scroll right/i,
      });
      expect(rightButton).toBeInTheDocument();
    });
  });

  window.Element.prototype.scrollTo = function () {}; // Mock implementation

  test('renders a left arrow button after the right arrow button is clicked', async () => {
    const rightButton = await screen.findByRole('button', {
      name: /Scroll right/i,
    });
    fireEvent.click(rightButton);
    await waitFor(async () => {
      const leftButton = await screen.findByRole('button', {
        name: /Scroll left/i,
      });
      expect(leftButton).toBeInTheDocument();
    });
  });
});

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrContext from '../../../../store/curr-item-context.jsx';
import mockStoredOutfits from '../../../../../__mocks__/mockStoredOutfits.js';
import mockCurrContet from '../../../../../__mocks__/contextMocks/mockCurrContet.js';

import OutfitItems from '../OutfitItems.jsx';

// Mock context data

const mockSingleStorageItem = [
  {
    id: 41049,
    product: {
      id: 41049,
      campus: 'hr-rfp',
      name: 'Cortney Dress',
      slogan: 'Eaque in et.',
      description:
        'Error vel ut quia voluptatibus aliquam. Et delectus id autem voluptatibus. Eum ut reiciendis et consequatur. Reiciendis expedita enim officiis. Veniam earum et nostrum eos in ut voluptatibus rerum ut.',
      category: 'Dress',
      default_price: '952.00',
      created_at: '2021-08-13T14:38:44.588Z',
      updated_at: '2021-08-13T14:38:44.588Z',
      features: [
        {
          feature: 'Buttons',
          value: '"Black Resin"',
        },
        {
          feature: 'Lens',
          value: '"100% UV Protective"',
        },
        {
          feature: 'Material',
          value: '"Control Support Bridge"',
        },
        {
          feature: 'Material',
          value: '"Rubber Mesh"',
        },
      ],
    },
    styles: {
      style_id: 245029,
      name: 'Silver',
      original_price: '952.00',
      sale_price: null,
      'default?': true,
      photos: [
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1526113438757-122d6d54da4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1563&q=80',
        },
      ],
      skus: {
        1421123: {
          quantity: 57,
          size: 'XS',
        },
        1421124: {
          quantity: 34,
          size: 'S',
        },
        1421125: {
          quantity: 38,
          size: 'M',
        },
        1421126: {
          quantity: 55,
          size: 'L',
        },
        1421127: {
          quantity: 9,
          size: 'XL',
        },
        1421128: {
          quantity: 50,
          size: 'XXL',
        },
      },
    },
    rating: '4.00',
  },
];

// Mock product data

// Custom render function
const renderWithProviders = (component, products) => {
  return render(
    <CurrContext.Provider value={products}>{component}</CurrContext.Provider>
  );
};
describe('OutfitItems', () => {
  // Test
  it('renders OutfitItems', () => {
    const { getByText } = renderWithProviders(<OutfitItems />, mockCurrContet);
    const addButton = getByText(/Add Item/i);
    fireEvent.click(addButton);
    const newCard = getByText(/Cayla Skirt/i);
    expect(newCard).toBeInTheDocument();
  });

  it('renders four cards', () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(mockStoredOutfits)
    );
    const { getAllByTestId } = renderWithProviders(
      <OutfitItems />,
      mockCurrContet
    );
    const cards = getAllByTestId('outfit-card');
    expect(cards.length).toBe(5);
  });

  it('renders action button', () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(mockSingleStorageItem)
    );
    const outfitItemsElement = renderWithProviders(
      <OutfitItems />,
      mockCurrContet
    );
    const cardElement = screen.getByTestId('outfit-card');
    expect(cardElement).toBeInTheDocument();
    const closeBtnElement = screen.getByRole('close');
    expect(closeBtnElement).toBeInTheDocument();
  });

  it('removes card when action button is clicked', () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(mockSingleStorageItem)
    );
    const outfitItemsElement = renderWithProviders(
      <OutfitItems />,
      mockCurrContet
    );
    const cardElement = screen.getByTestId('outfit-card');
    expect(cardElement).toBeInTheDocument();
    const closeBtnElement = screen.getByRole('close');
    expect(closeBtnElement).toBeInTheDocument();
    fireEvent.click(closeBtnElement);
    expect(closeBtnElement).not.toBeInTheDocument();
  });

  it('renders a right button', () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify(mockStoredOutfits)
    );
    const { getByRole } = renderWithProviders(<OutfitItems />, mockCurrContet);
    const rightButtonElement = getByRole('button');
    expect(rightButtonElement).toBeInTheDocument();
  });
});

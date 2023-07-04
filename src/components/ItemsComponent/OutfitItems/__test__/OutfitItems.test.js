import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrContext from '../../../../store/curr-item-context.jsx';
import mockProducts from './mockProducts.js';
import OutfitItems from '../OutfitItems.jsx';

// Mock context data
const mockContext = {
  currItem: {
    id: 40976,
    campus: 'hr-rfp',
    name: 'Cayla Skirt',
    slogan: 'Officia reiciendis officia nostrum.',
    description:
      'Natus ut ea modi ea ratione quia. Laboriosam aut eveniet sint distinctio temporibus cum nisi nesciunt omnis. Atque error sed.',
    category: 'Skirt',
    default_price: '643.00',
    created_at: '2021-08-13T14:38:44.588Z',
    updated_at: '2021-08-13T14:38:44.588Z',
    features: [
      {
        feature: 'Material',
        value: '"FullSupport Hybrid Compound"',
      },
      {
        feature: 'Frame',
        value: '"AllLight Composition Resin"',
      },
      {
        feature: 'Lens',
        value: '"Ultrasheen Gold"',
      },
      {
        feature: 'Satisfaction Guaranteed',
        value: null,
      },
    ],
  },
  currStyles: [
    {
      style_id: 245315,
      name: 'Turquoise',
      original_price: '380.00',
      sale_price: null,
      'default?': true,
      photos: [
        {
          thumbnail_url:
            'https://images.unsplash.com/photo-1562542119-19d015b93c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
        },
      ],
      skus: {
        1422919: {
          quantity: 12,
          size: 'XS',
        },
        1422920: {
          quantity: 24,
          size: 'S',
        },
        1422921: {
          quantity: 11,
          size: 'M',
        },
        1422922: {
          quantity: 44,
          size: 'L',
        },
        1422923: {
          quantity: 35,
          size: 'XL',
        },
        1422924: {
          quantity: 9,
          size: 'XXL',
        },
      },
    },
  ],
  currentStyle: {
    style_id: 245317,
    name: 'Orange',
    original_price: '380.00',
    sale_price: null,
    'default?': false,
    photos: [
      {
        thumbnail_url:
          'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1472186422470-1f3fbde547aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1647&q=80',
      },
    ],
    skus: {
      1422931: {
        quantity: 47,
        size: 'XS',
      },
      1422932: {
        quantity: 29,
        size: 'S',
      },
      1422933: {
        quantity: 0,
        size: 'M',
      },
      1422934: {
        quantity: 44,
        size: 'L',
      },
      1422935: {
        quantity: 22,
        size: 'XL',
      },
      1422936: {
        quantity: 30,
        size: 'XXL',
      },
    },
  },
  currAvgRating: 4,
  currTheme: 'light',
};
const mockedProducts = mockProducts;
// Mock product data

// Custom render function
const renderWithProviders = (component, products) => {
  return render(
    <CurrContext.Provider value={{ ...mockContext, mockProducts }}>
      {component}
    </CurrContext.Provider>
  );
};
describe('OutfitItems', () => {
  // Test
  it('renders OutfitItems', () => {
    const { getByText } = renderWithProviders(<OutfitItems />);
    const addButton = getByText(/Add Item/i);
    fireEvent.click(addButton);
    const newCard = getByText(/Cayla Skirt/i);
    expect(newCard).toBeInTheDocument();
  });

  it('renders four cards', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));
    const { getAllByTestId } = renderWithProviders(<OutfitItems />);
    const cards = getAllByTestId('outfit-card');
    expect(cards.length).toBe(5);
  });

  it('renders a right button', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));
    const { getByRole } = renderWithProviders(<OutfitItems />);
    const rightButtonElement = getByRole('button');
    expect(rightButtonElement).toBeInTheDocument();
  });
});

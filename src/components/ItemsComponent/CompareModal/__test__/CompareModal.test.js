import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompareModal from '../CompareModal.jsx';
import CurrContext from '../../../../store/curr-item-context.jsx';
import mockCurrContet from '../../../../../__mocks__/contextMocks/mockCurrContet.js';

const mockCardItem = {
  id: 40976,
  campus: 'hr-rfp',
  name: 'Cool Hat',
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
      value: '"Leather"',
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
      feature: 'Lifetime Warranty',
      value: null,
    },
  ],
};

const renderWithProviders = (component, products) => {
  return render(
    <CurrContext.Provider value={products}>{component}</CurrContext.Provider>
  );
};

describe('CompareModal', () => {
  it('should render a modal', () => {
    const compareModalElement = renderWithProviders(
      <CompareModal cardItem={mockCardItem} />,
      mockCurrContet
    );
    const someTextElement = screen.getByText(/Frame/i);
    expect(someTextElement).toBeInTheDocument();
  });

  it('should render 4 `x` icons for null features', () => {
    const compareModalElement = renderWithProviders(
      <CompareModal cardItem={mockCardItem} />,
      mockCurrContet
    );
    const xIconElements = screen.getAllByTestId('no-feature');
    expect(xIconElements.length).toBe(4);
  });
});

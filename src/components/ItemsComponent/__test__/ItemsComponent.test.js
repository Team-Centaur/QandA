import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ItemsComponent from '../ItemsComponent';

describe('ItemsComponent', () => {
  const mockCurrItem = {
    id: 40345,
    campus: 'hr-rfp',
    name: 'Bright Future Sunglasses',
    slogan: "You've got to wear shades",
    description:
      "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    category: 'Accessories',
    default_price: '69.00',
    created_at: '2021-08-13T14:38:44.509Z',
    updated_at: '2021-08-13T14:38:44.509Z',
    features: [
      {
        feature: 'Lenses',
        value: 'Ultrasheen',
      },
      {
        feature: 'UV Protection',
        value: null,
      },
      {
        feature: 'Frames',
        value: 'LightCompose',
      },
    ],
  };
  const mockSetCurrId = jest.fn();

  beforeEach(() => {
    render(
      <ItemsComponent currItem={mockCurrItem} setCurrId={mockSetCurrId} />
    );
  });

  it('renders without crashing', () => {
    const { container } = render(
      <ItemsComponent currItem={mockCurrItem} setCurrId={mockSetCurrId} />
    );
    expect(container.querySelector('.items-comp--section')).toBeInTheDocument();
  });
});

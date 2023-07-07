import React from 'react';
import { render } from '@testing-library/react';
import mockCurrContet from '../../../../__mocks__/contextMocks/mockCurrContet';
import CurrContext from '../../../store/curr-item-context';
import '@testing-library/jest-dom/extend-expect';

import ItemsComponent from '../ItemsComponent';

const renderWithProviders = (component, products) => {
  return render(
    <CurrContext.Provider value={products}>{component}</CurrContext.Provider>
  );
};

describe('ItemsComponent', () => {
  it('renders without crashing', () => {
    const ItemsComponentElement = renderWithProviders(
      <ItemsComponent />,
      mockCurrContet
    );

    expect(
      ItemsComponentElement.container.querySelector('.items-comp--section')
    ).toBeInTheDocument();
  });
});

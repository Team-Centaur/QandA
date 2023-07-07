import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ProductBreakdown from '../ProductBreakdown.jsx'
import { characteristics } from '../../../../../__mocks__/reviewMetadataMock.js';

describe('Product Breakdown', () => {

  beforeEach(async() => {
    render(<ProductBreakdown characteristics={characteristics} />);
  })

  it('renders a Breakdown Tile for each characteristic of a product', async () => {
    const breakdownTiles = await screen.findAllByTestId('productBreakdownTile');
    expect(breakdownTiles).toHaveLength(Object.keys(characteristics).length);
  });



});
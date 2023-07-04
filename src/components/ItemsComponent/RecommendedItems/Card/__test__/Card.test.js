import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../Card';
import getProductById from '../../../../../helperFunctions/App/getProductById';
import getStylesById from '../../../../../helperFunctions/App/getStylesById';
import getReviewMetadata from '../../../../../helperFunctions/getReviewMetadata';
import getRandomNumber from '../../../../../helperFunctions/App/getRandomNumber';
import { head } from 'underscore';

jest.mock('../../../../../helperFunctions/App/getProductById');
jest.mock('../../../../../helperFunctions/App/getStylesById');
jest.mock('../../../../../helperFunctions/getReviewMetadata');
jest.mock('../../../../../helperFunctions/App/getRandomNumber');

describe('Related Card', () => {
  const mockData = {
    productID: 1,
    setCurrId: jest.fn(),
    setCurrItem: jest.fn(),
    setCurrStyles: jest.fn(),
    setCurrAvgRating: jest.fn(),
    setRelatedItemData: jest.fn(),
    setCurrentStyle: jest.fn(),
    setOpenModal: jest.fn(),
    styleType: 'related',
  };

  const mockProduct = {
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
  };

  const mockStyles = {
    results: [
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
      {
        style_id: 245316,
        name: 'Cyan',
        original_price: '380.00',
        sale_price: null,
        'default?': false,
        photos: [
          {
            thumbnail_url:
              'https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
            url: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
          },
        ],
        skus: {
          1422925: {
            quantity: 32,
            size: 'XS',
          },
          1422926: {
            quantity: 59,
            size: 'S',
          },
          1422927: {
            quantity: 44,
            size: 'M',
          },
          1422928: {
            quantity: 17,
            size: 'L',
          },
          1422929: {
            quantity: 18,
            size: 'XL',
          },
          1422930: {
            quantity: 3,
            size: 'XXL',
          },
        },
      },
    ],
  };

  const mockMetaReviewData = {
    ratings: {
      1: 1,
      2: 2,
      3: 7,
      4: 8,
      5: 3,
    },
  };

  beforeEach(() => {
    getProductById.mockResolvedValue(mockProduct);
    getStylesById.mockResolvedValue(mockStyles);
    getReviewMetadata.mockResolvedValue(mockMetaReviewData);
    getRandomNumber.mockReturnValue(0);
  });

  it('renders product details correctly', async () => {
    render(<Card {...mockData} />);
    await waitFor(() => screen.getByText(/Cayla Skirt/i));
    expect(screen.getByText(/Cayla Skirt/i)).toBeInTheDocument();
    expect(screen.getByText('Skirt')).toBeInTheDocument();
    expect(screen.getByText('$380.00')).toBeInTheDocument();
  });

  xit('handles click events correctly', async () => {
    render(<Card {...mockData} />);
    await waitFor(() => {
      const headingElement = screen.getByText(/Cayla Skirt/i);
      fireEvent.click(headingElement);
      expect(mockData.setCurrItem).toBeCalledWith(mockProduct);
    });
  });
});

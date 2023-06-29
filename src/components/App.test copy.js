import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import getProductById from '../helperFunctions/App/getProductById.js';
import getReviewMetadata from '../helperFunctions/getReviewMetadata.js';
import getStylesById from '../helperFunctions/App/getStylesById.js';
import { ReviewIdProvider } from './ReviewIdContext';

jest.mock('../helperFunctions/App/getProductById.js');
jest.mock('../helperFunctions/getReviewMetadata.js');
jest.mock('../helperFunctions/App/getStylesById.js');

describe('App', () => {
  it('renders correctly', async () => {
    const fakeData = {
      info: {
        id: 40400,
        campus: 'hr-rfp',
        name: 'Samantha Hoodie',
        slogan: 'Dolorum odit assumenda nam veniam fugit quae.',
        description:
          'Itaque eum iure aut libero excepturi numquam voluptas tempore. Placeat non voluptatibus et. Recusandae harum fugiat voluptatum alias non. Nihil officia et ullam consectetur explicabo. Voluptas tempore excepturi qui. Esse et quos officiis.',
        category: 'Hoodie',
        default_price: '291.00',
        created_at: '2021-08-13T14:38:44.588Z',
        updated_at: '2021-08-13T14:38:44.588Z',
        features: [
          {
            feature: 'Green Leaf Certified',
            value: null,
          },
        ],
      },
      reviewMeta: {
        product_id: '40400',
        ratings: {
          2: '1',
          3: '1',
          4: '3',
        },
        recommended: {
          true: '5',
        },
        characteristics: {
          Fit: {
            id: 135404,
            value: '1.8000000000000000',
          },
          Length: {
            id: 135405,
            value: '3.6000000000000000',
          },
          Comfort: {
            id: 135406,
            value: '4.0000000000000000',
          },
          Quality: {
            id: 135407,
            value: '3.0000000000000000',
          },
        },
      },
      stylesData: {
        product_id: '40400',
        results: [
          {
            style_id: 240835,
            name: 'Pink',
            original_price: '291.00',
            sale_price: null,
            'default?': true,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              },
            ],
            skus: {
              1396609: {
                quantity: 30,
                size: 'XS',
              },
              1396610: {
                quantity: 33,
                size: 'S',
              },
              1396611: {
                quantity: 19,
                size: 'M',
              },
              1396612: {
                quantity: 56,
                size: 'L',
              },
              1396613: {
                quantity: 53,
                size: 'XL',
              },
              1396614: {
                quantity: 40,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240836,
            name: 'Purple',
            original_price: '291.00',
            sale_price: '193.00',
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
              },
            ],
            skus: {
              1396615: {
                quantity: 43,
                size: 'XS',
              },
              1396616: {
                quantity: 51,
                size: 'S',
              },
              1396617: {
                quantity: 34,
                size: 'M',
              },
              1396618: {
                quantity: 58,
                size: 'L',
              },
              1396619: {
                quantity: 48,
                size: 'XL',
              },
              1396620: {
                quantity: 33,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240837,
            name: 'Lavender',
            original_price: '291.00',
            sale_price: null,
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
              },
            ],
            skus: {
              1396621: {
                quantity: 12,
                size: 'XS',
              },
              1396622: {
                quantity: 21,
                size: 'S',
              },
              1396623: {
                quantity: 15,
                size: 'M',
              },
              1396624: {
                quantity: 13,
                size: 'L',
              },
              1396625: {
                quantity: 59,
                size: 'XL',
              },
              1396626: {
                quantity: 40,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240838,
            name: 'Turquoise',
            original_price: '291.00',
            sale_price: null,
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80',
              },
            ],
            skus: {
              1396627: {
                quantity: 7,
                size: 'XS',
              },
              1396628: {
                quantity: 55,
                size: 'S',
              },
              1396629: {
                quantity: 37,
                size: 'M',
              },
              1396630: {
                quantity: 30,
                size: 'L',
              },
              1396631: {
                quantity: 23,
                size: 'XL',
              },
              1396632: {
                quantity: 55,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240839,
            name: 'Black',
            original_price: '291.00',
            sale_price: null,
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1546367791-e7447b431084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
              },
            ],
            skus: {
              1396633: {
                quantity: 45,
                size: 'XS',
              },
              1396634: {
                quantity: 19,
                size: 'S',
              },
              1396635: {
                quantity: 57,
                size: 'M',
              },
              1396636: {
                quantity: 23,
                size: 'L',
              },
              1396637: {
                quantity: 8,
                size: 'XL',
              },
              1396638: {
                quantity: 19,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240840,
            name: 'Black',
            original_price: '291.00',
            sale_price: '131.00',
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1514613818067-e207c3441db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
              },
            ],
            skus: {
              1396639: {
                quantity: 0,
                size: 'XS',
              },
              1396640: {
                quantity: 8,
                size: 'S',
              },
              1396641: {
                quantity: 22,
                size: 'M',
              },
              1396642: {
                quantity: 42,
                size: 'L',
              },
              1396643: {
                quantity: 34,
                size: 'XL',
              },
              1396644: {
                quantity: 58,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240841,
            name: 'Orchid',
            original_price: '291.00',
            sale_price: '150.00',
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              },
            ],
            skus: {
              1396645: {
                quantity: 54,
                size: 'XS',
              },
              1396646: {
                quantity: 52,
                size: 'S',
              },
              1396647: {
                quantity: 26,
                size: 'M',
              },
              1396648: {
                quantity: 24,
                size: 'L',
              },
              1396649: {
                quantity: 35,
                size: 'XL',
              },
              1396650: {
                quantity: 20,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240842,
            name: 'Green',
            original_price: '291.00',
            sale_price: null,
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80',
              },
            ],
            skus: {
              1396651: {
                quantity: 46,
                size: 'XS',
              },
              1396652: {
                quantity: 53,
                size: 'S',
              },
              1396653: {
                quantity: 54,
                size: 'M',
              },
              1396654: {
                quantity: 23,
                size: 'L',
              },
              1396655: {
                quantity: 49,
                size: 'XL',
              },
              1396656: {
                quantity: 6,
                size: 'XXL',
              },
            },
          },
          {
            style_id: 240843,
            name: 'Orchid',
            original_price: '291.00',
            sale_price: null,
            'default?': false,
            photos: [
              {
                thumbnail_url:
                  'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
                url: 'https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80',
              },
            ],
            skus: {
              1396657: {
                quantity: 21,
                size: 'XS',
              },
              1396658: {
                quantity: 57,
                size: 'S',
              },
              1396659: {
                quantity: 44,
                size: 'M',
              },
              1396660: {
                quantity: 16,
                size: 'L',
              },
              1396661: {
                quantity: 28,
                size: 'XL',
              },
              1396662: {
                quantity: 35,
                size: 'XXL',
              },
            },
          },
        ],
      },
    }; // Replace with appropriate test data

    // Mock the functions to return promises that resolve with fake data
    getProductById.mockImplementation(() => Promise.resolve(fakeData.info));
    getReviewMetadata.mockImplementation(() =>
      Promise.resolve(fakeData.reviewMeta)
    );
    getStylesById.mockImplementation(() =>
      Promise.resolve(fakeData.stylesData)
    );

    let tree;

    await act(async () => {
      tree = renderer.create(<App />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

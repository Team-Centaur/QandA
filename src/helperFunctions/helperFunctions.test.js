import axios from 'axios';
import getProductById from './App/getProductById';

import getStylesById from './App/getStylesById';
import getReviewMetadata from './getReviewMetadata';
// Mock axios
jest.mock('axios');

// afterEach(() => {
//   jest.clearAllMocks(); // if you're using Jest to mock
//   // axios.mockRestore(); // uncomment this line if you're using axios mock
// });

describe('getProductById', () => {
  it('gets product info by ID', async () => {
    // Prepare
    const id = 40345;
    const response = {
      data: {
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
      },
    };

    // Mock the axios response
    axios.mockResolvedValue(response);
    // Act
    const data = await getProductById(id);
    // Assert
    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
      headers: { Authorization: process.env.REACT_APP_API_KEY },
    });

    expect(data).toEqual(response.data);
  });

  it('gets product info by ID', async () => {
    // Prepare
    const id = 40345;
    // Act
    const data = await getProductById(id);
    // Assert
    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
      headers: { Authorization: process.env.REACT_APP_API_KEY },
    });

    expect(data).toEqual({
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
    });
  });

  it('handles error', async () => {
    // Prepare
    const id = 1;
    const error = new Error('Network error');

    // Mock the axios error
    axios.mockRejectedValue(error);

    // Act
    const data = await getProductById(id);

    // Assert
    expect(data).toEqual(error);
  });
});

describe('getRelatedItemsByID', () => {
  it('fetch related items by ID', async () => {
    // Prepare
    let id = 1;
    let response = { data: [2, 3, 4] };

    // Mock the axios response
    axios.mockResolvedValue(response);

    // Act
    const data = await getRelatedItemsByID(id);

    // Assert
    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    });

    expect(data).toEqual(expect.arrayContaining(response.data));
  });

  it('handles error', async () => {
    // Prepare
    const id = 1;
    const error = new Error('Network error');

    // Mock the axios error
    axios.mockRejectedValue(error);

    // Act
    const data = await getRelatedItemsByID(id);

    // Assert
    expect(data).toEqual(error);
  });

  it('returns unique items', async () => {
    // Prepare
    const id = 1;
    const response = { data: [1, 2, 2, 3, 4, 4, 4, 5] };

    // Mock the axios response
    axios.mockResolvedValue(response);

    // Act
    const data = await getRelatedItemsByID(id);

    // Function to check if array has duplicates
    const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

    // Assert
    expect(hasDuplicates(data)).toBe(false);
  });
});

describe('getStylesById.js', () => {
  it('fetches styles by id', async () => {
    // prepare
    const id = 40345;
    const response = {
      data: {
        product_id: 40345,
        result: [
          {
            style_id: 240506,
            name: 'Black Lenses & Black Frame',
            original_price: '69.00',
            sale_price: null,
            'default?': false,
            photos: [
              {
                thumbnail_url: null,
                url: null,
              },
            ],
            skus: {
              null: {
                quantity: null,
                size: null,
              },
            },
          },
        ],
      },
    };
    axios.mockResolvedValue(response);
    // act
    const data = await getStylesById(id);
    expect(axios).toHaveBeenCalledWith({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      headers: { Authorization: process.env.REACT_APP_API_KEY },
    });
    expect(data).toEqual(response.data);
  });

  it('handles errors', async () => {
    // Prepare
    const id = 1;
    const error = new Error('Network error');

    // Mock the axios error
    axios.mockRejectedValue(error);

    // Act
    const data = await getRelatedItemsByID(id);

    // Assert
    expect(data).toEqual(error);
  });
});

import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const getReviewMetadata = async (id) => {
  try {
    const response = await axios.get(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/',
      {
        params: { product_id: id },
        headers: {
          Authorization: apiKey,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default getReviewMetadata;

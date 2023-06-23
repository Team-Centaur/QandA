import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

const getReviewMetadata = (id) => {
  console.log(`getReviewMetadata helper called!`);
  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/`,
    {
      params: {
        product_id: id },
      headers: {
        Authorization: apiKey
      }
    }
  )
};

export default getReviewMetadata;
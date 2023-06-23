import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

const getReviews = async (id, sort, page, count) => {
  try {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`,
    {
      params: {
        product_id: id,
        sort,
        page,
        count
      },
      headers: {
        Authorization: apiKey
      }
    })
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default getReviews;
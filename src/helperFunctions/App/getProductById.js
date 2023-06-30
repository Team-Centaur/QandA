import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
let getProductById = async (id) => {
  try {
    const response = await axios.get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
      {
        headers: { Authorization: apiKey },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export default getProductById;

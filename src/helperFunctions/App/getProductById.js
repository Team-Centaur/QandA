import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const getProductById = (id) => axios.get(
  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
  {
    headers: { Authorization: apiKey },
  },
)
  .then(({ data }) => data)
  .catch((err) => err);

export default getProductById;

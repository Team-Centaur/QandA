import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const getRelatedItemsById = async (id) => {
  try {
    const data = await axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`,
      headers: {
        Authorization: apiKey,
      },
    });
    const uniqueData = [...new Set(data.data)];
    return uniqueData;
  } catch (err) {
    return err;
  }
};

export default getRelatedItemsById;

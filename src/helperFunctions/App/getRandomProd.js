import axios from 'axios';
import getRandomNumber from './getRandomNumber.js';

const apiKey = process.env.REACT_APP_API_KEY;

const getRandomProd = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?count=100',
      headers: { Authorization: apiKey },
    });
    return response.data[getRandomNumber(0, 99)];
  } catch (err) {
    return err;
  }
};

export default getRandomProd;

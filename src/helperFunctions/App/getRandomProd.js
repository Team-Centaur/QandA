import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

const getRandomProd = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?count=100`,
      headers: { Authorization: apiKey },
    });
    return response.data[Math.floor(Math.random() * (99 - 0) + 0)];
  } catch (err) {
    return err;
  }
};

export default getRandomProd;

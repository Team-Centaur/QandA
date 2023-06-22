import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;


const getRandomProd = () => {
  return axios({
    method: "GET",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/?count=100`,
    headers: { Authorization: apiKey },
  }).then((data) => {
    return data.data[Math.floor(Math.random() * (99 - 0) + 0)];
  });
};

export default getRandomProd

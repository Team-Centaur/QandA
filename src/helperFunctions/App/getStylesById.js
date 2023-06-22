import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;

// Async function, use .then((data) => ....)
// when running this function to get the data,
// Provide id of the product you want styles of as an argument
const getStylesById = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      headers: { Authorization: apiKey },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
export default getStylesById;

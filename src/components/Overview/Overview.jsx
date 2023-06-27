/* eslint-disable react/self-closing-comp */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import getStylesById from '../../helperFunctions/App/getStylesById.js';
import getProductById from '../../helperFunctions/App/getProductById.js';
import ProductOverview from './ProductOverview/ProductOverview.jsx';

const apiKey = process.env.REACT_APP_API_KEY;

const Overview = ({ currItem, reviewId }) => {
  const [dataObj, setDataObj] = useState(null);
  useEffect(() => {
    let obj = {};
    getStylesById(currItem.id)
      .then((response) => {
        obj.styles = response.results;
      })
      .then(() => getProductById(currItem.id))
      .then((response) => {
        const {
          // eslint-disable-next-line camelcase
          id, name, slogan, description, category, default_price,
        } = response;
        obj = {
          ...obj, id, name, slogan, defaultPrice: default_price, description, category,
        };
      })
      .then(() => axios.get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${currItem.id}`,
        {
          headers: { Authorization: apiKey },
        },
      ))
      .then(({ data }) => {
        obj.ratings = data.ratings;
        setDataObj(obj);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <section className="overview-section">
      <div className="promotion-container"></div>
      <div className="product-container">
        <div className="image-gallery-container"></div>
        <ProductOverview dataObj={dataObj} reviewId={reviewId} />
      </div>
      <div className="description-container">

      </div>
    </section>
  );
};

export default Overview;


// Gonna try implementing the scroll feature.
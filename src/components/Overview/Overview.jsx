/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import getStylesById from '../../helperFunctions/App/getStylesById.js';
import getProductById from '../../helperFunctions/App/getProductById.js';

const apiKey = process.env.REACT_APP_API_KEY;

const Overview = ({ currItem }) => {
  const mainObj = useRef({});
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
        mainObj.current = obj;
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <section className="overview-section">
      <div className="promotion-container">Current Promotion Container</div>
      <div className="product-container">
        Image Gallery and Product Overview Container
        <div className="image-gallery-container">Image Gallery</div>
        <div className="product-details-container">Product Overview</div>
      </div>
      <div className="description-container">
        Description container
      </div>
    </section>
  );
};

export default Overview;

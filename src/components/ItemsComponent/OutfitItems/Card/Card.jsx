import React, { useEffect, useState } from 'react';
// import ActionBtnStar from './ActionBtn/ActionBtnStar.jsx';
import { each } from 'underscore';
import { FaXmark } from 'react-icons/fa6';

import Stars from '../../../Utilities/Stars/Stars.jsx';
// import StarRating from '../../Utilities/StarRating.jsx';
import './Card.css';

import getProductById from '../../../../helperFunctions/App/getProductById.js';
import getStylesById from '../../../../helperFunctions/App/getStylesById.js';
import getReviewMetadata from '../../../../helperFunctions/getReviewMetadata.js';

function Card({ productData, fullProds, setFullProds }) {
  const { styles, product, rating, id } = productData;
  // console.log(productData);
  useEffect(() => {
    // console.log(productData, styles);
  }, []);
  // useEffect(() => {
  //   getProductById(productID).then((data) => {
  //     setProductObj(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   getStylesById(productID)
  //     .then((data) => {
  //       setStyles(data.results);
  //     })
  //     .catch((err) => {
  //       console.error(`There was an error getting product styles: ${err}`);
  //     });
  // }, []);

  // useEffect(() => {
  //   getReviewMetadata(productID).then((data) => {
  //     let totalVotes = 0;
  //     let totalRating = 0;

  //     each(data.ratings, (votes, key) => {
  //       votes = Number.parseInt(votes);
  //       key = Number.parseInt(key);
  //       const keyTotal = key * votes;
  //       totalVotes += votes;
  //       totalRating += keyTotal;
  //     });

  //     const avgReview = (totalRating / totalVotes).toFixed(2);

  //     setAvgReview(avgReview);
  //   });
  // }, []);

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!styles) {
    return <div className="items-outfit--card">Loading...</div>;
  }

  // const randomStyle = styles[getRandomNumber(0, styles.length - 1)];

  // console.warn('STYLES: ', styles);
  const defaultStyle =
    styles && styles.results && styles.results[0] ? styles.results[0] : null;
  const imageUrl =
    defaultStyle && defaultStyle.photos && defaultStyle.photos[0]
      ? defaultStyle.photos[0].thumbnail_url
      : null;

  // const imageUrl = true;

  if (!productData) {
    return null;
  }

  /// /////////// EVENT HANDLERS //////////////
  const handleRemoveItem = () => {
    const updatedItems = fullProds.filter((item) => item.id !== id);
    setFullProds(updatedItems);
  };
  /// /////////// STYLES //////////////
  const starStyle = {
    color: '#000',
    fontSize: '1.5rem',
    zIndex: '2000',
    position: 'absolute',
    top: '5%',
    right: '5%',
    // filter: 'drop-shadow(rgba(255, 255, 255, 0.4) 0rem 0rem .3125rem)',
    filter: 'drop-shadow(rgba(255, 255, 255, 0.5) 0rem 0rem 0.1125rem )',
  };

  /// /////////// JSX //////////////
  return (
    <li className="items-outfit--card">
      {/* If there is no photo url, display gray background with text */}
      {!imageUrl && (
        <div className="items-outfit--card_img">
          <div
            className="items-outfit--card_img-img"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'grey',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            No Photo Available
          </div>
          <FaXmark color="black" className="items-outfit--card_img-icon" />

          {/* <ActionBtnStar /> */}
        </div>
      )}
      {/* If there is a photo url, display photo */}
      {imageUrl && (
        <div className="items-outfit--card_img">
          <div
            className="items-outfit--card_img-img"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <FaXmark
            style={starStyle}
            onClick={handleRemoveItem}
            className="items-outfit--card_img-icon"
          />
          {/* <ActionBtnStar /> */}
        </div>
      )}
      <div className="items-outfit--card_text">
        <p className="items-outfit--card_text-cat">
          {productData.product.category}
        </p>
        <p className="items-outfit--card_text-title">{product.name}</p>
        {/* If there is no sales price display normal price */}
        {!defaultStyle.sale_price && (
          <p className="items-outfit--card_text-price">{`$${defaultStyle.original_price}`}</p>
        )}
        {/* If there is a sale price, display it and cross out normal price */}
        {defaultStyle.sale_price && (
          <div className="items-outfit--card_text-price__container">
            <p className="items-outfit--card_text-price sale">
              {`$${defaultStyle.original_price}`}
            </p>
            <p className="items-outfit--card_text-sale">
              {`$${defaultStyle.sale_price}`}
            </p>
          </div>
        )}
        <div className="items-outfit--card_text-rating">
          <Stars avgRating={rating} />
        </div>
      </div>
    </li>
  );
}

export default Card;

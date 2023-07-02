import React, { useEffect, useState } from 'react';

import { FaRegCircleXmark } from 'react-icons/fa6';

import Stars from '../../../Utilities/Stars/Stars.jsx';
import './Card.css';

function Card({ productData, fullProds, setFullProds }) {
  const { styles, product, rating, id } = productData;

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!styles) {
    return <div className="items-outfit--card">Loading...</div>;
  }

  // const randomStyle = styles[getRandomNumber(0, styles.length - 1)];

  // console.warn('STYLES: ', styles);
  const defaultStyle = styles;

  const imageUrl = defaultStyle.photos[0].thumbnail_url;

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
    color: '#f8f8f8', // A light complimentary color
    fontSize: '1.5rem',
    zIndex: '2000',
    position: 'absolute',
    top: '5%',
    right: '5%',
    filter: 'drop-shadow(rgba(255, 255, 255, 0.4) 0rem 0rem .3125rem)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darkish transparent background
    borderRadius: '50%', // Makes the button circular
    width: '1.5rem', // Equal width and height
    height: '1.5rem',
    display: 'flex', // Center the icon
    justifyContent: 'center',
    alignItems: 'center',
  };
  // const starStyle = {
  //   color: '#000',
  //   fontSize: '1.5rem',
  //   zIndex: '2000',
  //   position: 'absolute',
  //   top: '5%',
  //   right: '5%',
  //   filter: 'drop-shadow(rgba(255, 255, 255, 0.4) 0rem 0rem .3125rem)',
  // };

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
          <FaRegCircleXmark
            color="black"
            className="items-outfit--card_img-icon"
          />

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
          <FaRegCircleXmark
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

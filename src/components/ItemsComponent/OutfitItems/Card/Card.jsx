import React, { useContext, useEffect, useState } from 'react';

import { FaRegCircleXmark } from 'react-icons/fa6';
import CurrContext from '../../../../store/curr-item-context.jsx';

import Stars from '../../../Utilities/Stars/Stars.jsx';
import '../../Card.css';

function Card({ productData, fullProds, setFullProds }) {
  const { styles, product, rating, id } = productData;
  const currCtx = useContext(CurrContext);

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!styles) {
    return <div className="items--card">Loading...</div>;
  }

  const defaultStyle = styles;

  const imageUrl = defaultStyle.photos[0].thumbnail_url;

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
    color: '#f8f8f8',
    fontSize: '1.5rem',
    zIndex: '2000',
    position: 'absolute',
    top: '5%',
    right: '5%',
    filter: 'drop-shadow(rgba(255, 255, 255, 0.4) 0rem 0rem .3125rem)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '50%',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  /// /////////// JSX //////////////
  return (
    <li
      className={`items--card ${currCtx.currTheme}`}
      data-testid="outfit-card"
    >
      {/* If there is no photo url, display gray background with text */}
      {!imageUrl && (
        <div className="items--card_img">
          <div
            className="items--card_img-img"
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
            className="items--card_img-icon"
            role="close"
          />

          {/* <ActionBtnStar /> */}
        </div>
      )}
      {/* If there is a photo url, display photo */}
      {imageUrl && (
        <div className="items--card_img">
          <div
            className="items--card_img-img"
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
            role="close"
            className="items-outfit--card_img-icon"
          />
          {/* <ActionBtnStar /> */}
        </div>
      )}
      <div className={`items--card_text ${currCtx.currTheme}`}>
        <p className="items--card_text-cat">{productData.product.category}</p>
        <p className="items--card_text-title">{product.name}</p>
        {/* If there is no sales price display normal price */}
        {!defaultStyle.sale_price && (
          <p className="items--card_text-price">{`$${defaultStyle.original_price}`}</p>
        )}
        {/* If there is a sale price, display it and cross out normal price */}
        {defaultStyle.sale_price && (
          <div className="items--card_text-price__container">
            <p className="items--card_text-price sale">
              {`$${defaultStyle.original_price}`}
            </p>
            <p className="items--card_text-sale">
              {`$${defaultStyle.sale_price}`}
            </p>
          </div>
        )}
        <div className="items--card_text-rating">
          <Stars avgRating={rating} />
        </div>
      </div>
    </li>
  );
}

export default Card;

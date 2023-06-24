import React, { useEffect, useState } from 'react';
import ActionBtnStar from './ActionBtn/ActionBtnStar.jsx';
import StarRating from '../../Utilities/StarRating.jsx';

import './Card.css';

import getProductById from '../../../helperFunctions/App/getProductById.js';
import getStylesById from '../../../helperFunctions/App/getStylesById.js';
// import getRandomNumber from '../../../helperFunctions/App/getRandomNumber.js';

function Card({ productID, setCurrItem, type }) {
  const [productObj, setProductObj] = useState(null);
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    getProductById(productID).then((data) => {
      setProductObj(data);
    });
  }, []);

  useEffect(() => {
    getStylesById(productID)
      .then((data) => {
        setStyles(data.results);
      })
      .catch((err) => {
        console.error(`There was an error getting product styles: ${err}`);
      });
  }, []);

  if (!styles) {
    return <div className="items-comp--card">Loading...</div>;
  }

  // const randomStyle = styles[getRandomNumber(0, styles.length - 1)];
  const randomStyle = styles[0];
  const imageUrl = randomStyle.photos[0].thumbnail_url;

  if (!productObj) {
    return;
  }

  const clickHandler = () => {
    setCurrItem(productObj);
  };

  return (
    <div className="items-comp--card" onClick={clickHandler} role="product">
      {/* If there is no photo url, display gray background with text */}
      {!imageUrl && (
        <div className="items-comp--card_img">
          <div
            className="items-comp--card_img-img"
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
          <ActionBtnStar />
        </div>
      )}
      {/* If there is a photo url, display photo */}
      {imageUrl && (
        <div className="items-comp--card_img">
          <div
            className="items-comp--card_img-img"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <ActionBtnStar />
        </div>
      )}
      <div className="items-comp--card_text">
        <p className="items-comp--card_text-cat">{productObj.category}</p>
        <p className="items-comp--card_text-title">{productObj.name}</p>
        {/* If there is no sales price display normal price */}
        {!randomStyle.sale_price && (
          <p className="items-comp--card_text-price">{`$${randomStyle.original_price}`}</p>
        )}
        {/* If there is a sale price, display it and cross out normal price */}
        {randomStyle.sale_price && (
          <div className="items-comp--card_text-price__container">
            <p className="items-comp--card_text-price sale">
              {`$${randomStyle.original_price}`}
            </p>
            <p className="items-comp--card_text-sale">
              {`$${randomStyle.sale_price}`}
            </p>
          </div>
        )}
        <p className="items-comp--card_text-rating">
          <StarRating rating={3} />
        </p>
      </div>
    </div>
  );
}

export default Card;

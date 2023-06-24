import React, { useEffect, useState } from 'react';
import ActionBtnStar from './ActionBtn/ActionBtnStar.jsx';
import StarRating from '../../Utilities/StarRating.jsx';

import './Card.css';

import getStylesById from '../../../helperFunctions/App/getStylesById.js';
import getRandomNumber from '../../../helperFunctions/App/getRandomNumber.js';

function Card({ product }) {
  //   const [productObj, setProductObj] = useState(null);
  const [styles, setStyles] = useState(null);
  useEffect(() => {
    getStylesById(product.id).then((data) => {
      setStyles(data.results);
    });
  }, []);

  if (!styles) {
    return <div className="items-comp--card">Loading...</div>;
  }

  const randomStyle = styles[getRandomNumber(0, styles.length - 1)];
  const imageUrl = randomStyle.photos[0].thumbnail_url;

  return (
    <div className="items-comp--card">
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
        <p className="items-comp--card_text-cat">{product.category}</p>
        <p className="items-comp--card_text-title">{product.name}</p>
        {!randomStyle.sale_price && (
          <p className="items-comp--card_text-price">{`$${randomStyle.original_price}`}</p>
        )}

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

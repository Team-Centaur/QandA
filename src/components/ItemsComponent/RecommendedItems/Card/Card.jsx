import React, { useEffect, useState } from 'react';
// import ActionBtnStar from './ActionBtn/ActionBtnStar.jsx';
import { each } from 'underscore';
import { FaRegStar } from 'react-icons/fa6';

import Stars from '../../../Utilities/Stars/Stars.jsx';
// import StarRating from '../../Utilities/StarRating.jsx';
import './Card.css';

import getProductById from '../../../../helperFunctions/App/getProductById.js';
import getStylesById from '../../../../helperFunctions/App/getStylesById.js';
import getReviewMetadata from '../../../../helperFunctions/getReviewMetadata.js';
// import getRandomNumber from '../../../helperFunctions/App/getRandomNumber.js';

function Card({
  productID,
  setCurrId,
  setCurrItem,
  setCurrStyles,
  setCurrAvgReview,
  setCurrReviewMeta,
}) {
  const [productObj, setProductObj] = useState(null);
  const [styles, setStyles] = useState(null);
  const [metaReviewData, setMetaReviewData] = useState(null);
  const [avgReview, setAvgReview] = useState(0);

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

  useEffect(() => {
    getReviewMetadata(productID).then((data) => {
      let totalVotes = 0;
      let totalRating = 0;
      setMetaReviewData(data);

      each(data.ratings, (votes, key) => {
        votes = Number.parseInt(votes);
        key = Number.parseInt(key);
        const keyTotal = key * votes;
        totalVotes += votes;
        totalRating += keyTotal;
      });

      const avgReview = (totalRating / totalVotes).toFixed(2);

      setAvgReview(avgReview);
    });
  }, []);

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!styles) {
    return <div className="items-comp--card">Loading...</div>;
  }

  // const randomStyle = styles[getRandomNumber(0, styles.length - 1)];
  const randomStyle = styles[0];
  const imageUrl = randomStyle.photos[0].thumbnail_url;

  if (!productObj) {
    return null;
  }

  /// /////////// EVENT HANDLERS //////////////
  const clickHandler = () => {
    setCurrItem(productObj);
    setCurrStyles(styles);
    setCurrAvgReview(avgReview);
    setCurrReviewMeta(metaReviewData);
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
    <li className="items-comp--card" onClick={clickHandler}>
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
          <FaRegStar color="black" />
          {/* <ActionBtnStar /> */}
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
          <FaRegStar style={starStyle} />
          {/* <ActionBtnStar /> */}
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
        <div className="items-comp--card_text-rating">
          <Stars avgRating={avgReview} />
        </div>
      </div>
    </li>
  );
}

export default Card;

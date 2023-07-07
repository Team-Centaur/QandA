import React, { useContext, useEffect, useState } from 'react';
// import ActionBtnStar from './ActionBtn/ActionBtnStar.jsx';
import { each } from 'underscore';
import { FaRegStar } from 'react-icons/fa6';

import CurrContext from '../../../../store/curr-item-context.jsx';

import Stars from '../../../Utilities/Stars/Stars.jsx';
import '../../Card.css';

import getProductById from '../../../../helperFunctions/App/getProductById.js';
import getStylesById from '../../../../helperFunctions/App/getStylesById.js';
import getReviewMetadata from '../../../../helperFunctions/getReviewMetadata.js';

function Card({ productID, setRelatedItemData, setOpenModal, styleType }) {
  const [productObj, setProductObj] = useState(null);
  const [styles, setStyles] = useState(null);
  const [outgoingStyles, setOutgoingStyles] = useState(null);
  const [metaReviewData, setMetaReviewData] = useState(null);
  const [avgRating, setAvgRating] = useState(0);

  const currCtx = useContext(CurrContext);

  useEffect(() => {
    getProductById(productID).then((data) => {
      setProductObj(data);
    });
  }, []);

  useEffect(() => {
    getStylesById(productID)
      .then((data) => {
        setOutgoingStyles(data);
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

      const avgRating = (totalRating / totalVotes).toFixed(2);

      setAvgRating(avgRating);
    });
  }, []);

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!styles) {
    return <div className="items-comp--card">Loading...</div>;
  }

  let itemStyle = {};
  if (styleType === 'related') {
    itemStyle = styles[0];
  } else {
    itemStyle = styles[1];
  }

  const imageUrl = itemStyle.photos[0].thumbnail_url;

  if (!productObj) {
    return null;
  }

  /// /////////// EVENT HANDLERS //////////////
  const clickHandler = () => {
    currCtx.setCurrItem(productObj);
    currCtx.setCurrStyles(outgoingStyles);
    currCtx.setCurrReviewMeta(metaReviewData);
    currCtx.setCurrAvgRating(avgRating);
    currCtx.setCurrentStyle(styles[0]);
    setOpenModal(false);
  };

  const handleActionBtnClick = (e) => {
    e.stopPropagation();
    setRelatedItemData(productObj);
    setOpenModal(true);
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
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  /// /////////// JSX //////////////
  return (
    <li
      className={`items--card recommended ${currCtx.currTheme}`}
      onClick={clickHandler}
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
          <FaRegStar color="black" />
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
          <FaRegStar style={starStyle} onClick={handleActionBtnClick} />
          {/* <ActionBtnStar /> */}
        </div>
      )}
      <div className={`items--card_text ${currCtx.currTheme}`}>
        <p className="items--card_text-cat">{productObj.category}</p>
        <p className="items--card_text-title">{productObj.name}</p>
        {/* If there is no sales price display normal price */}
        {!itemStyle.sale_price && (
          <p className="items--card_text-price">{`$${itemStyle.original_price}`}</p>
        )}
        {/* If there is a sale price, display it and cross out normal price */}
        {itemStyle.sale_price && (
          <div className="items--card_text-price__container">
            <p className="items--card_text-price sale">
              {`$${itemStyle.original_price}`}
            </p>
            <p className="items--card_text-sale">
              {`$${itemStyle.sale_price}`}
            </p>
          </div>
        )}
        <div className="items--card_text-rating">
          <Stars
            avgRating={avgRating}
            theme={currCtx.currTheme}
            onClick={handleActionBtnClick}
          />
        </div>
      </div>
    </li>
  );
}

export default Card;

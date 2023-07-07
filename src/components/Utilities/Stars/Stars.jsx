/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Star24Filled, Star24Regular } from '@fluentui/react-icons';
import CurrContext from '../../../store/curr-item-context.jsx';
import Star from './Star.jsx';

const Stars = ({ avgRating }) => {
  const currCtx = useContext(CurrContext);
  const renderStar = (rating) => {
    const floorRating = Math.floor(rating);
    const remainingStar = rating % 1;
    const stars = [];
    for (let i = 0; i < floorRating; i += 1) {
      stars.push(
        <span className={`star ${currCtx.theme}`} key={`filled-${i}`}>
          <Star24Filled />
        </span>
      );
    }
    stars.push(
      <Star
        starAmount={remainingStar}
        theme={currCtx.theme}
        key={`star-${remainingStar}`}
      />
    );
    while (stars.length < 5) {
      stars.push(
        <span
          className={`star ${currCtx.theme}`}
          key={`regular-${stars.length}`}
        >
          <Star24Regular />
        </span>
      );
    }
    return stars;
  };

  // a quick and dirty fix to the missing star issue
  let isStarMissing = false;
  if (avgRating === 1 || avgRating === 2 || avgRating === 3 || avgRating === 4) {
    isStarMissing = true;
  }

  if (avgRating) {
    return <div className="stars-container">{renderStar(avgRating)}{isStarMissing && <Star24Regular />}</div>;
  }
  return null;
};

export default Stars;

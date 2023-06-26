/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Star24Filled, Star24Regular } from '@fluentui/react-icons';
import Star from './Star.jsx';

const Stars = ({ avgRating }) => {
  const renderStar = (rating) => {
    const floorRating = Math.floor(rating);
    const remainingStar = rating % 1;
    const stars = [];
    for (let i = 0; i < floorRating; i += 1) {
      stars.push(
        <span className="star" key={i}>
          <Star24Filled key={i} />
        </span>,
      );
    }
    stars.push(<Star starAmount={remainingStar} key={remainingStar} />);
    while (stars.length < 5) {
      stars.push(<Star24Regular key={stars.length} />);
    }
    return stars;
  };

  if (avgRating) {
    return (
      <div className="stars-container">
        {renderStar(avgRating)}
      </div>

    );
  }
  return null;
};

export default Stars;

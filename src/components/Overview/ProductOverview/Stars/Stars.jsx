/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Star24Filled, Star24Regular } from '@fluentui/react-icons';
import Star from './Star.jsx';
import { Link } from 'react-scroll';
import { useReviewId } from '../../../ReviewIdContext.jsx';
// Imported custom Hook to use the state from Context
// very similar to useContext(reviewId);
const Stars = ({ avgRating, totalReviews }) => {

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
        <Link to={useReviewId()} smooth={true} offset={200} duration={500}> Read all {totalReviews} reviews(click!)</Link>
      </div>

    );
  }
  return null;
};

export default Stars;

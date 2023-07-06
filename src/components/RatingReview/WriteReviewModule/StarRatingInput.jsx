import React, { useState } from 'react';
import Star from '../../Overview/ProductOverview/Stars/Star.jsx';
import { Star24Filled, Star24Regular } from '@fluentui/react-icons';

const StarRatingInput = ({ setStarRating }) => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);

  const onStarClick = (e) => {
    let rating = e.currentTarget.getAttribute('value');
    setStars(stars.map(
      (star, index) => ((index <= rating) ? 1 : 0))
    );
    setStarRating(rating);
  };

  return (
    <div className='starRatingInput'>
      {stars.map((star, index) => (
        <span value={index} key={index} onClick={onStarClick}>
          {star ?
            <Star24Filled /> :
            <Star24Regular />}
        </span>
      ))}
    </div>
  );
}

export default StarRatingInput;
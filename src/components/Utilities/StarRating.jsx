import React, { useState } from 'react';
import Star from './Star.jsx';

// Pass a rating into here and it will fill the star up to that point.
// Only does full stars at the moment

const StarRating = ({ rating }) => (
  <span>
    {[1, 2, 3, 4, 5].map((val) => (
      <Star key={val} filled={val <= rating} />
    ))}
  </span>
);

export default StarRating;

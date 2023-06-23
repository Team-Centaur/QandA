import React from 'react';

const ReviewTile = ({review}) => {
  const { body, date, helpfulness, photos, rating, recommend, response, review_id, reviewer_name, summary } = review;
  console.log(body);

  return <div>
    I'm a tile!
  </div>
}

export default ReviewTile;
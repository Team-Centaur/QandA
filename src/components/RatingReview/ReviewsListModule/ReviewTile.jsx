import React, { useState } from 'react';
import StarRating from '../../Utilities/StarRating.jsx';

const ReviewTile = ({ review }) => {
  const { body, date, helpfulness, photos, rating, recommend, response, review_id, reviewer_name, summary } = review;
  console.log(body);
  console.log(review);

  // if review body is longer than char limit, show button and limit chars displayed
  const charLimit = 50; // **should be 250 for final product
  const [showButton, setShowButton] = useState(
    (body.length > charLimit) ? true : false);
  const [bodyDisplay, setBodyDisplay] = useState(
    (body.length > charLimit) ? body.slice(0, charLimit) : body);

  const [isVerified, setIsVerified] = useState(false); // TODO: check if user email is associated with sale in system


  // was this review helpful - yes/no radio buttions
  // render thumbnails if images

  return (
    <div className='reviewTile'>
      <h3>{StarRating({rating})}</h3>

      <div className='reviewDate'>{date}</div>

      <div className='reviewSummary'>{summary}</div>

      <div className='reviewBody'>{bodyDisplay}</div>
      {/* button only shows if body is longer than 250 */}
      {showButton && <button onClick={() => {
        setShowButton(false)
        setBodyDisplay(body)
        }}>Show more</button>}

      <div className='reviewImages'>images</div>

      <div className='reviewerName'>
        {reviewer_name}
        {isVerified && <span> Verified Purchaser</span>}
      </div>

      {recommend && <div>I recommend this product</div>}
      response from seller
      helpfullness button
    </div>
  );
};

export default ReviewTile;

import React, { useState } from 'react';
import StarRating from '../../Utilities/StarRating.jsx';

const ReviewTile = ({ review }) => {
  const { body, date, helpfulness, photos, rating, recommend, response, review_id, reviewer_name, summary } = review;
  console.log(review);

  // if review body is longer than char limit, show button and limit chars displayed
  const charLimit = 50; // **should be 250 for final product
  const [showButton, setShowButton] = useState(
    (body.length > charLimit) ? true : false
    );
  const [reviewDisplay, setReviewDisplay] = useState(
    (body.length > charLimit) ? body.slice(0, charLimit) : body
    );

  // render images if provided
  const [images, setImages] = useState(
    (photos.length) ? true : false
  );

  // TODO: check if user email is associated with sale in system
  const [isVerified, setIsVerified] = useState(false);

  // was this review helpful - yes/no radio buttions

  // render thumbnails if images

  return (
    <div className='reviewTile'>
      --------------------------------
      <h3>{StarRating({rating})}</h3>

      <div className='reviewDate'>{date}</div>

      <div className='reviewSummary'>{summary}</div>

      <div className='reviewBody'>{reviewDisplay}</div>
      {/* button only shows if body is longer than 250 */}
      {showButton && <button onClick={() => {
        setShowButton(false)
        setReviewDisplay(body)
        }}>Show more</button>}

      <div className='reviewImages'>images</div>

      <div className='reviewerName'>
        {reviewer_name}
        {isVerified && <span> Verified Purchaser</span>}
      </div>

      {recommend && <div>I recommend this product</div>}
      {response && <div>
        <h5>Response from Seller</h5>
        {response}
      </div>}
      <div className='reviewHelpfulness'>
        yes/no buttons
      </div>
      --------------------------------
    </div>
  );
};

export default ReviewTile;

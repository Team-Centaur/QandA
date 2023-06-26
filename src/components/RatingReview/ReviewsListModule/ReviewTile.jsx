import React, { useState } from 'react';
import StarRating from '../../Utilities/StarRating.jsx';
import ImageThumbnail from './ImageThumbnail.jsx';

const ReviewTile = ({ review }) => {
  const {
    body, date, helpfulness, photos, rating, recommend, response, review_id, reviewer_name, summary
  } = review;
  // console.log(review);

  // if review body is longer than char limit, show button and limit chars displayed
  const charLimit = 50; // **should be 250 for final product
  const [showButton, setShowButton] = useState(
    (body.length > charLimit)
  );
  const [reviewDisplay, setReviewDisplay] = useState(
    (body.length > charLimit) ? body.slice(0, charLimit) : body
  );

  // TODO: check if user email is associated with sale in system
  const [isVerified, setIsVerified] = useState(false);

  // was this review helpful - yes/no radio buttions

  return (
    <div className='reviewTile'>
      --------------------------------
      <h3>{StarRating({ rating })}</h3>

      <div className='reviewDate'>{date}</div>

      <div className='reviewSummary'>
        <h4>{summary}</h4>
      </div>

      <div className='reviewBody'>{reviewDisplay}</div>
      {/* button only shows if body is longer than 250 */}
      {showButton && (
      <button
        type='button'
        onClick={() => {
          setShowButton(false);
          setReviewDisplay(body);
        }}
      >
        Show more
      </button>
      )}

      <div className='reviewImages'>
        {!!(photos.length) && (
          photos.map((photo) => <ImageThumbnail key={photo.id} photo={photo} />)
        )}
      </div>

      <div className='reviewerName'>
        <h4>{reviewer_name}</h4>
        {isVerified && <span> Verified Purchaser</span>}
      </div>

      {recommend && (
        <div>
          I recommend this product
        </div>
      )}

      {response && (
        <div className='sellerResponse'>
          <h4>Response from Seller</h4>
          {response}
        </div>
      )}

      <div className='reviewHelpfulness'>
        Was this review helpful? yes ({ helpfulness }) / no (0) buttons
      </div>
      --------------------------------
    </div>
  );
};

export default ReviewTile;

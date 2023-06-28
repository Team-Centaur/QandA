import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import StarRating from '../../Utilities/StarRating.jsx';
import ImageThumbnail from './ImageThumbnail.jsx';
import ReviewHelpfulness from './ReviewHelpfulness.jsx';

const apiKey = process.env.REACT_APP_API_KEY;

const ReviewTile = ({ review }) => {
  const {
    body,
    date,
    helpfulness,
    photos,
    rating,
    recommend,
    response,
    review_id,
    reviewer_name,
    summary,
  } = review;
  // console.log(review);

  const formattedDate = dayjs(date).format('MMMM D, YYYY');

  // if review body is longer than char limit, show button and limit chars displayed
  const charLimit = 250;
  const [showButton, setShowButton] = useState(body.length > charLimit);
  const [reviewDisplay, setReviewDisplay] = useState(
    body.length > charLimit ? body.slice(0, charLimit) + '...' : body
  );

  const [isVerified, setIsVerified] = useState(false); // TODO: check if user email is associated with sale in system
  const [reviewHelpfulness, setReviewHelpfulness] = useState(helpfulness);
  const [votedHelpful, setVotedHelpful] = useState(false);

  const updateHelpfulness = async () => {
    // send axios PUT request to increment helpfulness
    try {
      if (!votedHelpful) {
        const response = await axios({
          method: 'put',
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${review_id}/helpful`,
          headers: {
            Authorization: apiKey,
          },
        });
<<<<<<< HEAD
        // console.log(response);
=======
        console.log(response);
>>>>>>> compare
        setReviewHelpfulness(reviewHelpfulness + 1);
        setVotedHelpful(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reviewTile">
      --------------------------------
      <h3>{StarRating({ rating })}</h3>
      <div className="reviewDate">{formattedDate}</div>
      <div className="reviewSummary">
        <h4>{summary}</h4>
      </div>
      <div className="reviewBody">{reviewDisplay}</div>
      {showButton && (
        <button
          type="button"
          onClick={() => {
            setShowButton(false);
            setReviewDisplay(body);
          }}
        >
          Show more
        </button>
      )}
      <div className="reviewImages">
        {!!photos.length &&
          photos.map((photo) => (
            <ImageThumbnail key={photo.id} photo={photo} />
          ))}
      </div>
      <div className="reviewerName">
        <h4>{reviewer_name}</h4>
        {isVerified && <span> Verified Purchaser</span>}
      </div>
      {recommend && (
        <div className="reviewRecommend">I recommend this product</div>
      )}
      {response && (
        <div className="sellerResponse">
          <h4>Response from Seller</h4>
          {response}
        </div>
      )}
      <ReviewHelpfulness
        reviewHelpfulness={reviewHelpfulness}
        updateHelpfulness={updateHelpfulness}
      />
      --------------------------------
    </div>
  );
};

export default ReviewTile;

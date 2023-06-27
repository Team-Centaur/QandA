import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import './ReviewsList.css';

const ReviewsList = ({ reviews, page, loadMoreReviews, allReviewsLoaded }) => (
  <div className='reviewsList'>
    <h1>Reviews List! </h1>
    {reviews.map((review) => <ReviewTile review={review} key={review.review_id} />)}
    {!allReviewsLoaded && <button type='button' onClick={loadMoreReviews}>Show more reviews</button>}
  </div>
);
export default ReviewsList;

import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import SortOrderButton from './SortOrderButton.jsx';
import './ReviewsList.css';

const ReviewsList = ({ reviews, page, loadMoreReviews, allReviewsLoaded }) => (
  <>
    <h1>REVIEWS LIST </h1>
    <SortOrderButton />
    <div className='reviewsList'>
      {reviews.map((review) => <ReviewTile review={review} key={review.review_id} />)}
      {!allReviewsLoaded && <button type='button' onClick={loadMoreReviews}>Show more reviews</button>}
    </div>
  </>
);
export default ReviewsList;

import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import SortOrderButton from './SortOrderButton.jsx';
import './ReviewsListModule.css';

const ReviewsList = ({ reviews, page, loadMoreReviews, allReviewsLoaded, changeSortOrder }) => (
  <div className='reviewsComponent' data-testid='reviewsList'>
    <h1> REVIEWS LIST </h1>
    <SortOrderButton changeSortOrder={changeSortOrder} />
    <div className='reviewsListModule reviewsList'>
      {reviews.map((review) => <ReviewTile review={review} key={review.review_id} />)}
      {!allReviewsLoaded && <button type='button' onClick={loadMoreReviews}>Show more reviews</button>}
    </div>
  </div>
);
export default ReviewsList;

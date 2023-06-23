import React from 'react';
import ReviewsList from './ReviewsListModule/ReviewsList.jsx'
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx'
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx'
import WriteReview from './WriteReviewModule/WriteReview.jsx'

const RatingReview = ({ currItem }) => {
  console.log(currItem);
  // make request to API for review data

  return <section>
    <ReviewsList />
    <RatingBreakdown />
    <ProductBreakdown />
    <WriteReview />
  </section>;
};

export default RatingReview;
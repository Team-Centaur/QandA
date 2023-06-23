import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewsList from './ReviewsListModule/ReviewsList.jsx'
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx'
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx'
import WriteReview from './WriteReviewModule/WriteReview.jsx'

import getReviewMetadata from '../../helperFunctions/getReviewMetadata.js'

const RatingReview = ({ currItem }) => {
  console.log(currItem);
  // currItem properties:
  // category, default_price, description, id, name, slogan, created_at, updated_at

  // make request to API for review data
  useEffect(() => {
    getReviewMetadata(currItem.id);
  }, [])

  return <section>
    <ReviewsList />
    <RatingBreakdown />
    <ProductBreakdown />
    <WriteReview />
  </section>;
};

export default RatingReview;
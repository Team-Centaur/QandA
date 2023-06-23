import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewsList from './ReviewsListModule/ReviewsList.jsx'
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx'
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx'
import WriteReview from './WriteReviewModule/WriteReview.jsx'

import getReviewMetadata from '../../helperFunctions/getReviewMetadata.js'
import getReviews from '../../helperFunctions/getReviews.js'

const RatingReview = ({ currItem }) => {
  console.log(currItem);
  // currItem properties: category, default_price, description, id, name, slogan, created_at, updated_at

  // make request to API for reviews, metadata
  useEffect(() => {
    async function getReviewData() {
      try {
        const metadata = await getReviewMetadata(currItem.id);
        const reviews = await getReviews(currItem.id);
        // SET STATES
      } catch (error) {
        console.log(error);
      }
    }
    getReviewData();
  }, [])

  return <section>
    <ReviewsList />
    <RatingBreakdown />
    <ProductBreakdown />
    <WriteReview />
  </section>;
};

export default RatingReview;
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ReviewsList from './ReviewsListModule/ReviewsList.jsx'
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx'
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx'
import WriteReview from './WriteReviewModule/WriteReview.jsx'

import getReviewMetadata from '../../helperFunctions/getReviewMetadata.js'
import getReviews from '../../helperFunctions/getReviews.js'

const RatingReview = ({ currItem }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);  // API set to return 2 reviews per page
  const [characteristics, setCharacteristics] = useState({});
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});

  // make request to API for reviews, metadata
  useEffect(() => {
    async function getReviewData() {
      try {
        const metadata = await getReviewMetadata(currItem.id);
        // get reviews sorted by relevance, start at page 1, only 2 reviews per page
        const reviews = await getReviews(currItem.id, 'relevant', 1, 2);
        setReviews(reviews);
        console.log(reviews);
        console.log(metadata);
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
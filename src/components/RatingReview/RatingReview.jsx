import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ReviewsList from './ReviewsListModule/ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx';
import WriteReview from './WriteReviewModule/WriteReview.jsx';
import ReviewTile from './ReviewsListModule/ReviewTile.jsx';

import getReviewMetadata from '../../helperFunctions/getReviewMetadata.js';
import getReviews from '../../helperFunctions/getReviews.js';

const RatingReview = ({ currItem, reviewId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1); // API set to return 2 reviews per page
  const [characteristics, setCharacteristics] = useState({});
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});
  const [sortOrder, setSortOrder] = useState('relevant');
  const [allReviewsLoaded, setAllReviewsLoaded] = useState(false);

  // make request to API for reviews, metadata
  useEffect(() => {
    async function getReviewData() {
      try {
        const metadataRes = await getReviewMetadata(currItem.id);
        // get reviews sorted by relevance, start at page 1, only 2 reviews per page
        const reviewsRes = await getReviews(currItem.id, sortOrder, page, 2);
        setReviews(reviewsRes.results);
        setCharacteristics(metadataRes.characteristics);
        setRatings(metadataRes.ratings);
        setRecommended(metadataRes.recommended);
      } catch (error) {
        console.log(error);
      }
    }
    getReviewData();
  }, []);

  const loadMoreReviews = () => {
    getReviews(currItem.id, 'relevant', (page + 1), 2).then((reviewsRes) => {
      if (reviewsRes.results.length < 2) {
        // if API returns less than 2 reviews, all reviews have been loaded
        setAllReviewsLoaded(true);
      } else {
        setReviews([...reviews, ...reviewsRes.results]);
        setPage(page + 1);
      }
    });
  };

  return (
    <section className='ratingReview' id={reviewId}>
      <ReviewsList
        reviews={reviews}
        page={page}
        loadMoreReviews={loadMoreReviews}
        allReviewsLoaded={allReviewsLoaded}
      />
      <RatingBreakdown />
      <ProductBreakdown />
      <WriteReview />
    </section>
  );
};

export default RatingReview;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ReviewsList from './ReviewsListModule/ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx';
import WriteReview from './WriteReviewModule/WriteReview.jsx';
import ReviewTile from './ReviewsListModule/ReviewTile.jsx';

import getReviewMetadata from '../../helperFunctions/getReviewMetadata.js';
import getReviews from '../../helperFunctions/getReviews.js';

import { useReviewId } from '../ReviewIdContext.jsx'; // custom hook to supply id to

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
        const metadataResponse = await getReviewMetadata(currItem.id);
        // get reviews sorted by relevance, start at page 1, only 2 reviews per page
        const reviewsResponse = await getReviews(currItem.id, sortOrder, page, 2);
        setReviews(reviewsResponse.results);
        setCharacteristics(metadataResponse.characteristics);
        setRatings(metadataResponse.ratings);
        setRecommended(metadataResponse.recommended);
      } catch (error) {
        console.error(error);
      }
    }
    getReviewData();
  }, [currItem]);

  const loadMoreReviews = () => {
    getReviews(currItem.id, sortOrder, page + 1, 2).then((reviewsResponse) => {
      if (reviewsResponse.results.length < 2) {
        // if API returns less than 2 reviews, all reviews have been loaded
        setAllReviewsLoaded(true);
      } else {
        setReviews([...reviews, ...reviewsResponse.results]);
        setPage(page + 1);
      }
    });
  };

  // Rating Breakdown Filter Tiles
  const loadFilteredReviews = async (e) => {
    try {
    const rating = e.currentTarget.getAttribute('value');
      setPage(1);
      setAllReviewsLoaded(false);

      let count = 10;
      let filteredReviews = [];
      /* ALL ASYNCRONOUS, THIS MIGHT NOT BE RIGHT */
      // while ((filteredReviews.length < 2) && !allReviewsLoaded)  {
      const get2FilteredReviews = async (e) => {
        let { results } = await getReviews(currItem.id, sortOrder, page, count);
        return results.filter((review) => (review.rating.toString() === rating));
        // await setAllReviewsLoaded(!allReviewsLoaded);

        // add filtered reviews, only allow those with rating match
        // set next page
        return results;
      }
      let results = await get2FilteredReviews();
      console.log(results);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    // supplying Id through custom hook that utilizes useContext
    <section className="ratingReview" id={useReviewId()}>
      <ReviewsList
        reviews={reviews}
        page={page}
        loadMoreReviews={loadMoreReviews}
        allReviewsLoaded={allReviewsLoaded}
      />
      <RatingBreakdown ratings={ratings} onFilterClick={loadFilteredReviews}/>
      <ProductBreakdown />
      <WriteReview characteristics={characteristics} />
    </section>
  );
};

export default RatingReview;

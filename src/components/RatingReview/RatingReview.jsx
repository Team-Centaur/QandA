import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ReviewsList from './ReviewsListModule/ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdownModule/RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdownModule/ProductBreakdown.jsx';
import WriteReview from './WriteReviewModule/WriteReview.jsx';
import ReviewTile from './ReviewsListModule/ReviewTile.jsx';

import getReviewMetadata from '../../helperFunctions/getReviewMetadata.js';
import getReviews from '../../helperFunctions/getReviews.js';
import './RatingReview.css';

import { useReviewId } from '../ReviewIdContext.jsx'; // custom hook to supply id to

const RatingReview = ({ currItem, reviewId }) => {
  const [reviews, setReviews] = useState([]); // this array of reviews renders on the page
  const [page, setPage] = useState(1); // API set to return 2 reviews per page
  const [characteristics, setCharacteristics] = useState({});
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});
  const [sortOrder, setSortOrder] = useState('relevant');
  const [allReviewsLoaded, setAllReviewsLoaded] = useState(false);
  const [filter, setFilter] = useState(0); // 0 when no filter applied
  const [filteredReviews, setFilteredReviews] = useState([]); // *NEEDS OPTIMIZATION* this array holds all reviews, to be used by getFilteredReviews function

  // INITIAL REQUEST TO API FOR REVIEWS + METADATA
  useEffect(() => {
    async function getReviewData() {
      try {
        console.log('rendering')
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
  }, [currItem, sortOrder]);

  // FETCH 2 MORE REVIEWS FOR REVIEWS LIST
  const loadMoreReviews = () => {
    // DEFAULT behavior (no review filtering)
    if (!filter) {
      // call API for 2 reviews at a time and update reviews list
      getReviews(currItem.id, sortOrder, page + 1, 2).then((reviewsResponse) => {
        if (reviewsResponse.results.length < 2) {
          // if API returns less than 2 reviews, all reviews have been loaded
          console.log('setting all reviews loaded');
          setAllReviewsLoaded(true);
        } else {
          setReviews([...reviews, ...reviewsResponse.results]);
          setPage(page + 1);
        }
      });
    // behavior if review filter is applied
    } else {
      // render next 2 reviews from filteredReviews array
      let newReviewIndex = reviews.length;
      let newReviews = filteredReviews.slice(newReviewIndex, newReviewIndex + 1);
      setReviews([...reviews, ...newReviews])
      if (reviews.length === filteredReviews.length) {
        setAllReviewsLoaded(true);
      }
    }
  };

  // CHANGE SORT ORDER OF REVIEWS LIST
  const changeSortOrder = (e) => {
    const newSortOrder = e.target.value;
    console.log(newSortOrder);
    setSortOrder(newSortOrder);
    setPage(1);
    setAllReviewsLoaded(false);
  }

  // FILTER REVIEWS IN REVIEWS LIST
  const setReviewListFilter = async (e) => {
    // star and sumOfReviews stored as string in filter element's value attribute
    const filterValueAttribute = e.currentTarget.getAttribute('value');
    const stars = filterValueAttribute[0];
    console.log(`review filter: ${stars}`)
    await setFilter(parseInt(stars));
    await setAllReviewsLoaded(false);
  }
  // THIS FUNCTION IS JUST FOR APPLYING A FILTER TO REVIEWS LIST
  // not optimized, requests ALL reviews from API and filters array
  useEffect(() => {
    async function getFilteredReviews() {
      try {
        let { results } = await getReviews(currItem.id, sortOrder, 1, 10000);
        let filteredResults = (results.filter(
          (review) => (review.rating === filter)
        ));
        await setFilteredReviews(filteredResults);
        return (filteredResults.slice(0, 2)); // renders first 2 reviews from filtered array
      } catch (error) {
        console.error(error);
      }
    }
    getFilteredReviews().then(
      (first2Reviews) => setReviews(first2Reviews)
    );
  }
  , [filter, sortOrder]);

  // GET SUM OF REVIEWS
  const numOfReviews = Object.values(ratings).map((vote) => parseInt(vote));
  const sumOfReviews = (numOfReviews.reduce(
    (sum, val) => (
      sum + val
    ), 0));

  return (
    // supplying Id through custom hook that utilizes useContext
    <section className="ratingReview" id={useReviewId()}>
      <RatingBreakdown
        ratings={ratings}
        numOfReviews={numOfReviews}
        sumOfReviews={sumOfReviews}
        onFilterClick={setReviewListFilter}
      />
      <ProductBreakdown
        characteristics={characteristics}
      />
      <ReviewsList
        reviews={reviews}
        page={page}
        loadMoreReviews={loadMoreReviews}
        allReviewsLoaded={allReviewsLoaded}
        changeSortOrder={changeSortOrder}
      />
      <WriteReview
        characteristics={characteristics}
      />
    </section>
  );
};

export default RatingReview;
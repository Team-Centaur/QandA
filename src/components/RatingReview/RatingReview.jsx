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
  const [filter, setFilter] = useState(0); // 0 when no filter applied
  const [filteredReviewCount, setFilteredReviewCount] = useState(0); // tracks number of reviews left to load

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

  // fetch 2 more reviews for review list
  const loadMoreReviews = () => {
    console.log(`filter: ${filter}`)
    if (!filter) {
      getReviews(currItem.id, sortOrder, page + 1, 2).then((reviewsResponse) => {
        if (reviewsResponse.results.length < 2) {
          // if API returns less than 2 reviews, all reviews have been loaded
          setAllReviewsLoaded(true);
        } else {
          setReviews([...reviews, ...reviewsResponse.results]);
          setPage(page + 1);
        }
      });
    } else {
      console.log('load more filtered reviews');
    }
  };

  // filter reviews for review list
  const setReviewListFilter = async (e) => {
    const [ stars ] = e.currentTarget.getAttribute('value');
    await setFilter(parseInt(stars));
    await setPage(1);
  }
  useEffect(() => {
    async function getFilteredReviews() {
      try {
        // only render first 2 matching reviews, save page
        let { results } = await getReviews(currItem.id, sortOrder, page, 10);
        let filteredReviews = results.filter(
          (review) => (review.rating === filter)
        );
        console.log(filteredReviews);
        if (filteredReviews.length < 2) {
          // if less than 2 reviews, request next page
          // let moreReviews = await getFilteredReviews();
          // console.log(moreReviews);
          return filteredReviews;
        //  // filteredReviews.concat(await getFilteredReviews());
        } else if (filteredReviews.length > 2) {
          // if more than 2 reviews, only return first 1
          return filteredReviews.slice(0, 2);
        } else {
          await setPage(page + 1);
          return filteredReviews;
        }
      } catch (error) {
        console.error(error);
      }
    }
    getFilteredReviews().then((newReviews) => {
      console.log(newReviews);
      setReviews(newReviews);
    });
  }
  , [filter]);

  // get sum of reviews
  const numOfVotes = Object.values(ratings).map((vote) => parseInt(vote));
  const sumOfVotes = (numOfVotes.reduce(
    (sum, val) => (
      sum + val
    ), 0));

  return (
    // supplying Id through custom hook that utilizes useContext
    <section className="ratingReview" id={useReviewId()}>
      <ReviewsList
        reviews={reviews}
        page={page}
        loadMoreReviews={loadMoreReviews}
        allReviewsLoaded={allReviewsLoaded}
      />
      <RatingBreakdown ratings={ratings} numOfVotes={numOfVotes} sumOfVotes={sumOfVotes} onFilterClick={setReviewListFilter}/>
      <ProductBreakdown />
      <WriteReview characteristics={characteristics} />
    </section>
  );
};

export default RatingReview;

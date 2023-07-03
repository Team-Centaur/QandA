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
  const [filteredReviewCount, setFilteredReviewCount] = useState(0); // tracks number of filtered reviews left to load

  // MAKE REQUEST TO API FOR REVIEWS, METADATA
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
    console.log(`filter: ${filter}`)
    console.log(sortOrder);
    if (!filter) {
      // console.log(`sort order: ${sortOrder}`);
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
    } else {
      console.log('load more filtered reviews');
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
    const sumOfReviews = filterValueAttribute.slice(2);
    await setFilter(parseInt(stars));
    await setFilteredReviewCount(parseInt(sumOfReviews));
    await setPage(1);
    await setAllReviewsLoaded(false);
  }
  // THIS FUNCTION IS MESSED UP, NEEDS FIXING
  // should retrieve 2 reviews that match rating filter
  useEffect(() => {
    async function getFilteredReviews(currentPage) {
      try {
        // only render first 2 matching reviews, save page
        let { results } = await getReviews(currItem.id, sortOrder, currentPage, 10);
        // console.log(results);
        let filteredReviews = results.filter(
          (review) => {
            // console.log(`review rating: ${review.rating}`);
            return (review.rating === filter);
          }
        );
        // await setPage(currentPage);
        if ((filteredReviews.length < 2) && (reviews.length < filteredReviewCount)) {
          // if less than 2 reviews, request next page
          // await setPage(page + 1);
          // let moreReviews = await getFilteredReviews(currentPage + 1);
          // console.log(filteredReviews.concat(moreReviews));
          return filteredReviews;
          // filteredReviews.concat(await getFilteredReviews());
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
    getFilteredReviews(page).then((newReviews) => {
      setReviews(newReviews);
    });
  }
  , [filter]);

  // GET SUM OF REVIEWS
  const numOfReviews = Object.values(ratings).map((vote) => parseInt(vote));
  const sumOfReviews = (numOfReviews.reduce(
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
        changeSortOrder={changeSortOrder}
      />
      <RatingBreakdown
        ratings={ratings}
        numOfReviews={numOfReviews}
        sumOfReviews={sumOfReviews}
        onFilterClick={setReviewListFilter}
      />
      <ProductBreakdown characteristics={characteristics}/>
      <WriteReview characteristics={characteristics} />
    </section>
  );
};

export default RatingReview;

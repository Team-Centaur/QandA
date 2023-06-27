/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Stars from './Stars/Stars.jsx';

const ProductOverview = ({ dataObj, reviewsId }) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if(dataObj) {
      let ratingObj = dataObj.ratings;
      console.log(dataObj.ratings);
      let sumRatings = 0;
      let reviewTotal = 0;
      Object.keys(ratingObj).forEach((key) => {
      const multiply = key * ratingObj[key];
      sumRatings += multiply;
      reviewTotal += parseInt(ratingObj[key], 10);
    });
    console.log('SUM',sumRatings);
    console.log('TOTAL',reviewTotal);
    setAvgRating(sumRatings/reviewTotal);
    setTotalReviews(reviewTotal)
    }
  }, [dataObj])
  // const avgRating = (ratingObj) => {
  //   let sumRatings = 0;
  //   let reviewTotal = 0;
  //   Object.keys(ratingObj).forEach((key) => {
  //     const multiply = key * ratingObj[key];
  //     sumRatings += multiply;
  //     reviewTotal += parseInt(ratingObj[key], 10);
  //   });

  //   return sumRatings / reviewTotal;
  // };

  if (dataObj) {
    return (
      <div className="product-overview-container">
        <Stars
          avgRating={avgRating}
          reviewsId={reviewsId}
          totalReviews= {totalReviews}
        />
        <div className="product-category">
          { dataObj.category }
        </div>
        <h2 className="product-name">
          { dataObj.name}
        </h2>
        <div className="product-price">
          { dataObj.defaultPrice }
        </div>
        <div className="product-sale-price"></div>
      </div>

    );
  }
  return null;
};
export default ProductOverview;

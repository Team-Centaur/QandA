/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Stars from './Stars/Stars.jsx';
import SocialShare from './SocialShare/SocialShare.jsx';
import AllStyles from './ProductStyles/AllStyles.jsx';
import './ProductOverviewCompStyles/styles.css'
const ProductOverview = ({ dataObj }) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [currStyle, setCurrStyle] = useState({});
  const [styles, setStyles] = useState(dataObj.styles); // array of styles
  const [onSale, setOnSale] = useState(false);
  useEffect(() => {
    if(dataObj) {
      let ratingObj = dataObj.ratings;
      let sumRatings = 0;
      let reviewTotal = 0;
      Object.keys(ratingObj).forEach((key) => {
      const multiply = key * ratingObj[key];
      sumRatings += multiply;
      reviewTotal += parseInt(ratingObj[key], 10);
    });
    setTotalReviews(reviewTotal);
    setAvgRating(sumRatings/reviewTotal);
    setCurrStyle(dataObj.styles[0]);
    setStyles(dataObj.styles);
    dataObj.styles[0].sale_price? setOnSale(true) : setOnSale(false);
    };
  },[dataObj]);
  if (dataObj) {
    return (
      <div className="product-overview-container">
        <Stars
          avgRating={avgRating}
          totalReviews= {totalReviews}
        />
        <div className="product-details-container">
          <div className="product-category">
            { dataObj.category }
          </div>
          <h2 className="product-name">
            { dataObj.name}
          </h2>
          <div className="price-container">
            <div className={onSale ? 'product-on-sale' : 'default-price'}>
              { dataObj.defaultPrice }
            </div>
            <div style ={{color:'red'}}className="product-sale-price"> {currStyle.sale_price}</div>
          </div>
        </div>
        <SocialShare />
        <div className="styles-container">
          <p><span>{`Styles >`}</span> {currStyle.name}</p>
          <AllStyles styles={styles} setCurrStyle = {setCurrStyle} setOnSale = {setOnSale}/>
        </div>
      </div>

    );
  }
  return null;
};
export default ProductOverview;

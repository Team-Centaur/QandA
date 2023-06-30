/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Stars from './Stars/Stars.jsx';
import SocialShare from './SocialShare/SocialShare.jsx';
import AllStyles from './ProductStyles/AllStyles.jsx';
import SizeMenu from './DropDownMenus/SizeSelectorComponent/SizeMenu.jsx';
import QuantityMenu from './DropDownMenus/QuantitySelectorComponent/QuantityMenu.jsx';
import './ProductOverviewCompStyles/styles.css'

const ProductOverview = ({ dataObj,currentStyle, setCurrentStyle }) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  // const [currStyle, setCurrStyle] = useState({});
  const [styles, setStyles] = useState(dataObj.styles); // array of styles
  const [onSale, setOnSale] = useState(false); // an object withe size and its quantity
  const [sizeSelected, setSizeSelected ] = useState(null);
  const [quantitySelected, setQuantitySelected] = useState(1);

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
    // setCurrStyle(dataObj.styles[0]);
    setStyles(dataObj.styles);
    dataObj.styles[0].sale_price? setOnSale(true) : setOnSale(false);
    };
  },[dataObj]);

  useEffect (() => {
    setQuantitySelected(1);
    setSizeSelected(null);
  }, [currentStyle])
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
              { currentStyle.original_price }
            </div>
            <div style ={{color:'red'}}className="product-sale-price"> {currentStyle.sale_price}</div>
          </div>
        </div>
        <SocialShare />
        <div className="styles-container">
          <p><span>{`Styles >`}</span> {currentStyle.name}</p>
          <AllStyles styles={styles} setCurrentStyle = {setCurrentStyle} setOnSale = {setOnSale}/>
        </div>
        <div className = "dropdown-menus-container">
          <SizeMenu currentStyle={currentStyle} setSizeSelected={setSizeSelected} />
          <QuantityMenu
            currStyle={currentStyle}
            sizeSelected={sizeSelected}
            quantitySelected={quantitySelected}
            setQuantitySelected={setQuantitySelected}
          />
        </div>
      </div>

    );
  }
  return null;
};
export default ProductOverview;

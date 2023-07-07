/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import Stars from './Stars/Stars.jsx';
import SocialShare from './SocialShare/SocialShare.jsx';
import AllStyles from './ProductStyles/AllStyles.jsx';
import SizeMenu from './DropDownMenus/SizeSelectorComponent/SizeMenu.jsx';
import QuantityMenu from './DropDownMenus/QuantitySelectorComponent/QuantityMenu.jsx';
import axios from 'axios';
import CurrContext from '../../../store/curr-item-context.jsx';
import './ProductOverviewCompStyles/styles.css'

const ProductOverview = ({ dataObj,currentStyle, setCurrentStyle }) => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  // const [currStyle, setCurrStyle] = useState({});
  const [styles, setStyles] = useState(dataObj.styles); // array of styles
  const [onSale, setOnSale] = useState(false); // an object withe size and its quantity
  const [sizeSelected, setSizeSelected ] = useState(null); // an array of sku and total quantity
  const [quantitySelected, setQuantitySelected] = useState(1); // int
  const currCtx = useContext(CurrContext);

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
    //[0].sale_price
    dataObj.styles[0].sale_price? setOnSale(true) : setOnSale(false);
    };
  },[dataObj]);

  useEffect (() => {
    setQuantitySelected(1);
    setSizeSelected(null);
  }, [currentStyle])

  const onAddToCart = (style, count) => {
    const sku_id = style[0];
    if(sku_id) {
      // Create a post call with body
        // {'sku_id' : sku_id, 'count':count}
        const data = {
          'sku_id': sku_id,
          'count': count
        }
        axios.post
          (
            'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
            data,{
              headers: {Authorization: process.env.REACT_APP_API_KEY }
            }
          )
        .then((response)=> console.log(response))
        .catch((err) => console.log(err))
    } else {

      alert('You have nothing in cart');
    }
  }
  if (dataObj) {
    console.log(dataObj);
    return (
      <>
        <div className="product-overview-container">
          <div className="product-details-container">
              <Stars
                avgRating={avgRating}
                totalReviews= {totalReviews}
              />
            <div className="product-category">
              { dataObj.category }
            </div>
            <h2 className="product-name">
              { dataObj.name}
            </h2>
            <div className="price-container">
              { dataObj.defaultPrice && (<div className={onSale ? 'product-on-sale' : 'default-price'}>
                { dataObj.defaultPrice }
              </div>)}
              {currentStyle.sale_price && (
                <div style={{ color: 'red' }} className="product-sale-price">
                {currentStyle.sale_price}
              </div>
              )}
            </div>
          </div>
          <SocialShare  />
          <div className="styles-container">
            <p><span className='style'>{`Styles >`}</span> {currentStyle.name}</p>
            <AllStyles styles={styles} setCurrentStyle = {setCurrentStyle} setOnSale = {setOnSale}/>

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
          {sizeSelected && <button className ={`add-to-cart ${currCtx.currTheme}`} onClick={(e) => onAddToCart(sizeSelected, quantitySelected)}>Add To Cart</button>}
        </div>


      </>

    );
  }
  return null;
};
export default ProductOverview;

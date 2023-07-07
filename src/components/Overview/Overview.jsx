/* eslint-disable react/self-closing-comp */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import CurrContext from '../../store/curr-item-context.jsx';
import getStylesById from '../../helperFunctions/App/getStylesById.js';
import getProductById from '../../helperFunctions/App/getProductById.js';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import './OverviewCompStyles/Overview.css';

const apiKey = process.env.REACT_APP_API_KEY;

const Overview = ({
  currItem,
  currentStyle,
  setCurrentStyle,
  currStyles,
  setOverviewRendered,
  currAvgRating,
  currReviewMeta
}) => {
  const [dataObj, setDataObj] = useState(null);
  const [expandedView, setExpandedView] = useState(false);

  const currCtx = useContext(CurrContext);

  useEffect(() => {
    if (currStyles && currStyles.results && currReviewMeta) {
      const obj = {
        id: currItem.id,
        name: currItem.name,
        slogan: currItem.slogan,
        defaultPrice: currItem.default_price,
        description: currItem.description,
        category: currItem.category,
        styles: currStyles.results,
        ratings: currReviewMeta.ratings
      };
      setDataObj(obj);
    }
  }, [currItem, currStyles, currReviewMeta]);
  const onExpandedViewHandler = () => {
    if (expandedView) {
      setExpandedView(false);
    } else {
      setExpandedView(true);
    }
  };

  ////////***RENDERING***//////
  if (dataObj) {
    return (
      <section className="overview-section">
        <div className= {`promotion-container ${currCtx.currTheme}`}></div>
        <div className={`product-container ${currCtx.currTheme}`}>
          <ImageGallery
            expandedView={expandedView}
            onExpandedViewHandler={onExpandedViewHandler}
            currStyles={currStyles}
            currentStyle={currentStyle}
          />
          {!expandedView && (
            <ProductOverview
              dataObj={dataObj}
              currentStyle={currentStyle}
              setCurrentStyle={setCurrentStyle}
            />
          )}
        </div>
        <div className={`description-container ${currCtx.currTheme}`}>
        <span className="span">
            Product Description:
            </span>
          <p className='description'>
            {dataObj.description}
          </p>

        </div>
      </section>
    );
  }
  return null;
};

export default Overview;

// Gonna try implementing the scroll feature.

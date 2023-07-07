/* eslint-disable react/self-closing-comp */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
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
  currReviewMeta,
}) => {
  const [dataObj, setDataObj] = useState(null);
  const [expandedView, setExpandedView] = useState(false);

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
        ratings: currReviewMeta.ratings,
      };
      setDataObj(obj);
      setOverviewRendered(true);
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
        <div className="promotion-container"></div>
        <div className="product-container">
          <ImageGallery
            expandedView={expandedView}
            onExpandedViewHandler={onExpandedViewHandler}
            currItem={currItem}
            currStyles={currStyles}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
          />
          {!expandedView && (
            <ProductOverview
              dataObj={dataObj}
              currentStyle={currentStyle}
              setCurrentStyle={setCurrentStyle}
            />
          )}
        </div>
        <div className="description-container"></div>
      </section>
    );
  }
  return null;
};

export default Overview;

// Gonna try implementing the scroll feature.

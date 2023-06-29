import React, { Component, useEffect, useState } from 'react';
import Overview from './Overview/Overview.jsx';
import ItemsComponent from './ItemsComponent/ItemsComponent.jsx';
import QuesAnswer from './QuesAnswer/QuesAnswer.jsx';
import RatingReview from './RatingReview/RatingReview.jsx';
import { ReviewIdProvider } from './ReviewIdContext.jsx'; // context needed for overview scrool feature
import getProductById from '../helperFunctions/App/getProductById.js';
import getReviewMetadata from '../helperFunctions/getReviewMetadata.js';
import getStylesById from '../helperFunctions/App/getStylesById.js';
import getRandomProd from '../helperFunctions/App/getRandomProd.js';
import './App.css';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [currId, setCurrId] = useState(40400); // 40400
  const [currItem, setCurrItem] = useState(null);
  const [currReviewMeta, setCurrReviewMeta] = useState(null);
  const [currStyles, setCurrStyles] = useState(null);
  useEffect(() => {
    getRandomProd().then((data) => {
      setCurrItem(data);
    });
  }, []);

  useEffect(() => {
    getProductById(currId)
      .then((data) => {
        setCurrItem(data);
      })
      .then(() => {
        getReviewMetadata(currId).then((data) => {
          setCurrReviewMeta(data);
        });
      })
      .then(() => {
        getStylesById(currId).then((data) => {
          setCurrStyles(data);
        });
      })
      .catch((err) => {
        console.log(`There was an error fetching product info: ${err}`);
      });
  }, [currId]);

  if (!currItem) {
    return <div>Loading...</div>;
  }
  return (
    // Can use a state within ReviewIdContext in any child component
    // that ReviewIdProvider is wrapped around.
    // no need to send the state as prop through nested children
    <ReviewIdProvider>
      <div className="app-container">
        <h1>Hello worlds!</h1>
        <Overview currItem={currItem} />
        <ItemsComponent currItem={currItem} setCurrId={setCurrId} />
        <QuesAnswer product={currItem} />
        <RatingReview currItem={currItem} />
      </div>
    </ReviewIdProvider>
  );
}

export default App;

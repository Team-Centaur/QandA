import React, { Component, useEffect, useState} from 'react';
import axios from 'axios';
import getRandomProd from '../helperFunctions/App/getRandomProd.js';
import Overview from './Overview/Overview.jsx';
import ItemsComponent from './ItemsComponent/ItemsComponent.jsx';
import QuesAnswer from './QuesAnswer/QuesAnswer.jsx';
import RatingReview from './RatingReview/RatingReview.jsx';
import { ReviewIdProvider } from './ReviewIdContext.jsx'; // context needed for overview scrool feature
import './App.css';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const reviewId = useState('review');
  const [currItem, setCurrItem] = useState(null);
  useEffect(() => {
    getRandomProd().then((data) => {
      setCurrItem(data);
    });
  }, []);

  if (!currItem) {
    return <div>Loading...</div>;
  }
  console.log(currItem);
  return (
    // Can use a state within ReviewIdContext in any child component
      // that ReviewIdProvider is wrapped around.
      // no need to send the state as prop through nested children
    <ReviewIdProvider>
      <div className="app-container">
        <h1>Hello worlds!</h1>
        <Overview currItem={currItem} reviewId={reviewId} />
        <ItemsComponent currItem={currItem} setCurrItem={setCurrItem} />
        <QuesAnswer product={currItem} />
        <RatingReview currItem={currItem} reviewId={reviewId} />
      </div>
    </ReviewIdProvider>
  );
}

export default App;

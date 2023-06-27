import React, { Component, useEffect, useState, createContext } from 'react';
import axios from 'axios';
import getRandomProd from '../helperFunctions/App/getRandomProd.js';
import Overview from './Overview/Overview.jsx';
import ItemsComponent from './ItemsComponent/ItemsComponent.jsx';
import QuesAnswer from './QuesAnswer/QuesAnswer.jsx';
import RatingReview from './RatingReview/RatingReview.jsx';
import './App.css';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [currItem, setCurrItem] = useState(null);
  // const [reviewsId, setReviewsId] = useState('reviews');
  const reviewId = createContext('review');
  // passing reviewId to btoh Ratings and Overview for use of 'react-scroll'
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
    <div className="app-container">
      <h1>Hello worlds!</h1>
      <Overview currItem={currItem} />
      <ItemsComponent currItem={currItem} setCurrItem={setCurrItem} />
      <QuesAnswer product={currItem} />

      <reviewId.Provider = value={}
      <RatingReview currItem={currItem} />
    </div>
  );
}

export default App;

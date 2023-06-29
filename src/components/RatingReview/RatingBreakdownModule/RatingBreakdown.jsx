import React from 'react';
import RatingSummary from './RatingSummary.jsx'
import RatingBreakdownFilter from './RatingBreakdownFilter.jsx'

import './RatingBreakdown.css'

const RatingBreakdown = ({ ratings }) => {

  const numOfStars = Object.keys(ratings);
  const numOfVotes = Object.values(ratings).map((vote) => parseInt(vote));
  const sumOfRatings = (numOfStars.reduce(
    (sum, key, index) => (
      sum += key * numOfVotes[index]
    ), 0));
  const sumOfVotes = (numOfVotes.reduce(
    (sum, val) => (
      sum + val
    ), 0));
  const average = Math.round(sumOfRatings / sumOfVotes * 10) / 10;

  return (
    <div className='ratingBreakdown'>
      <h1>Rating Breakdown</h1>
      <RatingSummary average={average}/>
      <RatingBreakdownFilter ratings={ratings} sumOfVotes={sumOfVotes}/>
    </div>
  );
};

export default RatingBreakdown;
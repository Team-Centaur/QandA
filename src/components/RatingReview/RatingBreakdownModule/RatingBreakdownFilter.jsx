import React from 'react';
import StarFilter from './StarFilter.jsx';

const RatingBreakdownFilter = ({ ratings, sumOfVotes }) => {
  return (
    <div className='ratingBreakdownFilter'>
      <h3>Rating Breakdown</h3>
      {['1', '2', '3', '4', '5'].map((stars) =>
        <StarFilter stars={stars} numOfVotes={ratings[stars]} sumOfVotes= {sumOfVotes} key={stars}/>
      )}
    </div>
  );
}
export default RatingBreakdownFilter;
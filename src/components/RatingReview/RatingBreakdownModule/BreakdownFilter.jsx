import React from 'react';
import StarFilter from './StarFilter.jsx';

const BreakdownFilter = ({ ratings, sumOfReviews, onFilterClick }) => {
  return (
    <div className='ratingBreakdownFilter'>
      <h3>Rating Breakdown</h3>
      {['1', '2', '3', '4', '5'].map((stars) =>
        <StarFilter stars={stars} numOfReviews={ratings[stars]} sumOfReviews= {sumOfReviews} key={stars} onFilterClick={onFilterClick}/>
      )}
    </div>
  );
}
export default BreakdownFilter;
import React from 'react';
import StarFilter from './StarFilter.jsx';

const RatingBreakdownFilter = ({ ratings, sumOfReviews, onFilterClick }) => {

  return (
    <div className='ratingBreakdownFilter'>
      {['5', '4', '3', '2', '1'].map((stars) =>
        <StarFilter stars={stars} numOfReviews={ratings[stars]} sumOfReviews= {sumOfReviews} key={stars} onFilterClick={onFilterClick}/>
      )}
    </div>
  );
}
export default RatingBreakdownFilter;
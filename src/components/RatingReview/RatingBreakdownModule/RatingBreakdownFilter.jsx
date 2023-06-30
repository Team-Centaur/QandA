import React from 'react';
import StarFilter from './StarFilter.jsx';

const RatingBreakdownFilter = ({ ratings, sumOfVotes }) => {
  const onFilterClick = (e) => {
    console.log(e.currentTarget.getAttribute('value'));
  }
  return (
    <div className='ratingBreakdownFilter'>
      <h3>Rating Breakdown</h3>
      {['1', '2', '3', '4', '5'].map((stars) =>
        <StarFilter stars={stars} numOfVotes={ratings[stars]} sumOfVotes= {sumOfVotes} key={stars} onFilterClick={onFilterClick}/>
      )}
    </div>
  );
}
export default RatingBreakdownFilter;
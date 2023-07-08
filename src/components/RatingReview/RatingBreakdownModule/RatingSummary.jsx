import React from 'react';
import Stars from '../../Utilities/Stars/Stars.jsx'

const RatingSummary = ({ average, sumOfReviews }) => {


  // On component's first mount, the average is NaN because no product info is retrieved,
  // So the average score is rendered on the condition that it is a number
  return (
    <div className='ratingSummary'>
      <h2 style={{fontSize: '45px'}}>
        {(average !== NaN) && String(average)}
        {(average === NaN) && 'No reviews yet'}
      </h2>
      <Stars avgRating={average} />
    </div>
  );
};

export default RatingSummary;
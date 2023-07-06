import React from 'react';
import Stars from '../../Overview/ProductOverview/Stars/Stars.jsx';

const RatingSummary = ({ average, sumOfReviews }) => {


  // On component's first mount, the average is NaN because no product info is retrieved,
  // So the average score is rendered on the condition that it is a number
  return (
    <div className='ratingSummary'>
      <h1 style={{fontSize: '45px'}}>
        {(average !== NaN) && String(average)}
      </h1>
      <Stars avgRating={average} totalReviews= {sumOfReviews} />
    </div>
  );
};

export default RatingSummary;
import React from 'react';

const RatingSummary = ({ average }) => {


  // On component's first mount, the average is NaN because no product info is retrieved,
  // So the average score is rendered on the condition that it is a number
  return (
    <div className='ratingSummary'>
      <h3>Rating Summary</h3>
      <h1>{(typeof average === 'number') && String(average)}</h1>
      *** Render stars here
    </div>
  );
};

export default RatingSummary;
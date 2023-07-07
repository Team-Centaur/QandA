import React, { useState } from 'react';
import NewReviewForm from './NewReviewForm.jsx';
import './WriteReview.css';

const WriteReview = ({ characteristics, product_id }) => {
  const [writeReview, setWriteReview] = useState(false)

  const onWriteReview = () => setWriteReview(true);
  const onClose = () => setWriteReview(false);

  return (
    <div className='writeReview' data-testid='writeReview'>
      <button onClick={onWriteReview} id='writeReviewButton'>Write a review</button>
      {writeReview && <NewReviewForm onClose={onClose} characteristics={characteristics} product_id={product_id} />}
    </div>
  );
};

export default WriteReview;
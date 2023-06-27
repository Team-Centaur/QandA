import React, { useState } from 'react';
import NewReviewForm from './NewReviewForm.jsx';

const WriteReview = ({ characteristics }) => {
  const [writeReview, setWriteReview] = useState(false)

  const onWriteReview = () => setWriteReview(true);
  const onClose = () => setWriteReview(false);

  return <div>
   <button onClick={onWriteReview}>Write a review</button>
   {writeReview && <NewReviewForm onClose={onClose} characteristics={characteristics}/>}
  </div>
};

export default WriteReview;
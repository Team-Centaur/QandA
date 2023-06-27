import React, { useContext, useState } from 'react';

const ReviewIdContext = React.createContext();
export function useReviewId() {
  return useContext(ReviewIdContext)
}
export function ReviewIdProvider ({ children }) {
  const [reviewId, setReviewId] = useState('review')
  // can add as many states as we want and send them as value
    // Ex: value = {reviewId, setReviewId}
  return (
    <ReviewIdContext.Provider value={reviewId}>
      {children}
    </ReviewIdContext.Provider>
  )
}
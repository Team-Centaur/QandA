import React from 'react';
import ReviewTile from './ReviewTile.jsx'

const ReviewsList = ({reviews, page}) => {

  return <section>
  <h1>Reviews List! </h1>
  {reviews.map((review) =>
    <ReviewTile review={review} key={review.review_id}/>
    )
  }
  </section>
}

export default ReviewsList;
import React from 'react';

const ReviewsList = ({reviews, page}) => {
  console.log(reviews)
  console.log(page)

  return <section>
  <h1>Reviews List! </h1>
  {reviews.map((review) =>
    <div>{review.summary}</div>
    )
  }
  </section>
}

export default ReviewsList;
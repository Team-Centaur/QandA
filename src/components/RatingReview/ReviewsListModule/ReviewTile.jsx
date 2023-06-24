import React, {useState} from 'react';

const ReviewTile = ({review}) => {
  const { body, date, helpfulness, photos, rating, recommend, response, review_id, reviewer_name, summary } = review;
  console.log(body);
  console.log(review);

  // if review body is longer than 250 char, truncate body in preview to 250
  const [truncateBody, setTruncateBody] = useState(
    (body.length > 50) ? true : false);
  const [bodyDisplay, setBodyDisplay] = useState(
    (body.length > 50) ? body.slice(0, 50) : body);

  const [isVerified, setIsVerified] = useState(false); // TODO: check if user email is associated with sale in system


  // was this review helpful - yes/no radio buttions
  // render thumbnails if images

  return <div className='reviewTile'>
    <h3>Star rating</h3>
    <div className='reviewDate'>{date}</div>
    <div className='reviewSummary'>{summary}</div>
    <div className='reviewBody'>{bodyDisplay}</div>
    {truncateBody && <button onClick={() => {
      setTruncateBody(false)
      setBodyDisplay(body)
      }}>Show more</button>}
    <div>images</div>
    <div className='reviewerName'>
      {reviewer_name}
      {isVerified && <span> Verified Purchaser</span>}
    </div>

    {recommend && <div>I recommend this product</div>}
    response from seller
    helpfullness button
  </div>
}

export default ReviewTile;
import React, { useState } from 'react';

const ReviewBodyInput = () => {
  const [body, setBody] = useState('');

  const onType = (e) => setBody(e.target.value);

  return (
    <>
      <h4>Review Body</h4>
      <textarea name='reviewBody' minLength='50' maxLength='1000' placeholder='Why did you like the product or not?' onChange={onType} required></textarea>
      { (body.length < 50) ?
        <div>Minimum required characters left: {50 - body.length}</div> :
        <div>Minimum reached</div> }
    </>
  );
};

export default ReviewBodyInput;
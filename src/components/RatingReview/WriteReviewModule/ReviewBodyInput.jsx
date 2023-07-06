import React from 'react';

const ReviewBodyInput = ({ setBodyInput, bodyInput }) => {

  return (
    <>
      <h4>Review Body</h4>
      <textarea
        name='reviewBody'
        style={{width: '300px', height: '100px'}}
        minLength='50'
        maxLength='1000'
        placeholder='Why did you like the product or not?'
        onChange={(e) => setBodyInput(e.target.value)}
        required
      ></textarea>
      { (bodyInput.length < 50) ?
        <div>Minimum required characters left: {50 - bodyInput.length}</div> :
        <div>Minimum reached</div> }
    </>
  );
};

export default ReviewBodyInput;
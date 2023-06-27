import React from 'react';

const ReviewFormStyles = {
  position: 'fixed',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex:  1,
};

const FormOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1
};

const NewReviewForm = ({ onClose }) => {
  return (
    <div style={FormOverlayStyles}>
      <form style={ReviewFormStyles}>
        <button onClick={onClose}>X</button>
        <h3>Write a new review</h3>
        <div>overall rating (stars)</div>
        <div>DO you recomend this product - radio buttons</div>
        <div> render tile for each product characteristc w/ radio buttons</div>
        <div className='summaryInput'>
          Review Summary
          <input type='text'></input>
        </div>
        <div className='bodyInput'>
          Review Body
          <input type='text'></input>
        </div>
        <div> upload photos</div>
        {/* <input type='text'>nickname</input> */}
      </form>
    </div>
  );
};

export default NewReviewForm;
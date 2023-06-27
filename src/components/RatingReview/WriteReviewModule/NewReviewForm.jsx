import React from 'react';
import CharacteristicInput from './CharacteristicInput.jsx';

const ReviewFormStyles = {
  position: 'fixed',
  bottom: '50%',
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

const NewReviewForm = ({ onClose, characteristics }) => {
  let charaList = Object.entries(characteristics);

  return (
    <div style={FormOverlayStyles}>
      <form style={ReviewFormStyles}>
        <button onClick={onClose}>X</button>
        <h3>Write a new review</h3>

        <div className='ratingInput'>
          <h4>Overall rating</h4>
          (stars)
        </div>

        <div className='recommendInput'>
          Do you recommend this product?
          <input type='radio' id='recYes' value='yes' name='recommended' defaultChecked={true} onChange={(e) => console.log(e.target.value)} required />
          <label htmlFor='recYes'> Yes </label>
          <input type='radio' id='recNo' value='no' name='recommended' />
          <label htmlFor='recNo'> No </label>
        </div>

        <div className='characteristicsInput'>
          {charaList.map((chara) => <CharacteristicInput chara={chara} key={chara} />)}
        </div>

        <div className='summaryInput'>
          <h4>Review Summary</h4>
          <input type='text'></input>
        </div>

        <div className='bodyInput'>
          <h4>Review Body</h4>
          <input type='text' required></input>
        </div>

        <div className='photoUpload'>
          <h4>Upload photos</h4>
          *IN PROGRESS*
        </div>

        {/* <input type='text'>nickname</input> */}
        <div className='reviewerInfo'>
          <h4>Nickname</h4>
          <input type='text' required></input>
          <h4>Email</h4>
          <input type='email' required></input>
        </div>

      </form>
    </div>
  );
};

export default NewReviewForm;
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import CharacteristicInput from './CharacteristicInput.jsx';
import RecommendInput from './RecommendInput.jsx';
import ReviewerInfoInput from './ReviewerInfoInput.jsx';
import ReviewBodyInput from './ReviewBodyInput.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import StarRatingInput from './StarRatingInput.jsx';
import './NewReviewForm.css';

import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

const ReviewFormStyles = {
  position: 'fixed',
  bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  width: '50vw',
  height: '90vh',
  overflowY: 'auto',
  textAlign: 'center',
  borderRadius: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '10px',
  zIndex:  '2001',
  fontFamily: 'sans-serif'
};

const FormOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 2001
};

const NewReviewForm = ({ onClose, characteristics, product_id }) => {
  let charaList = Object.entries(characteristics);
  const [starRating, setStarRating] = useState(0);
  const [recommendInput, setRecommendInput] = useState(true);
  const [characteristicsInput, setCharacteristicsInput] = useState({});
  const [summaryInput, setSummaryInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(characteristicsInput)
      onClose();
      const response = await axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`,
        {params: {
          product_id,
          rating: parseInt(starRating),
          summary: summaryInput,
          body: bodyInput,
          recommend: recommendInput,
          name: nickname,
          email: email,
          // photos: [],
          characteristics: characteristicsInput
        }},
        {headers: {
          Authorization: apiKey
        }}
      )
      console.log(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  return ReactDom.createPortal(
    <div style={FormOverlayStyles}>
      <form style={ReviewFormStyles} onSubmit={onSubmit} data-testid='newReviewForm' >
        <button onClick={onClose}>X</button>
        <h3>Write a new review</h3>

        <div className='ratingInput formContent' >
          <h4>Overall rating</h4>
          <StarRatingInput setStarRating={setStarRating} />
        </div>

        <div className='recommendInput formContent'>
          <RecommendInput setRecommendInput={setRecommendInput}/>
        </div>

        <div className='characteristicsInput'>
          {charaList.map((chara) =>
            <CharacteristicInput
              chara={chara}
              key={chara}
              characteristicsInput={characteristicsInput}
              setCharacteristicsInput={setCharacteristicsInput}
            />)}
        </div>

        <div className='summaryInput formContent'>
          <h4>Review Summary</h4>
          <textarea
            maxLength='60'
            style={{width: '300px', height: '50px'}}
            placeholder='Example: Best purchase ever!'
            onChange={(e) => setSummaryInput(e.target.value)}
          >
          </textarea>
        </div>

        <div className='bodyInput formContent'>
          <ReviewBodyInput setBodyInput={setBodyInput} bodyInput={bodyInput} />
        </div>

        <div className='photoUpload formContent'>
          <PhotoUpload setPhotos={setPhotos} photos={photos}/>
        </div>

        <div className='reviewerInfo formContent'>
          <ReviewerInfoInput setNickname={setNickname} setEmail={setEmail} />
        </div>

        <input type='submit' value='Submit'></input>
      </form>
    </div>,
    document.getElementById('portal')
  );
};

export default NewReviewForm;
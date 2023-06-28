import React from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import './Answer.css';

const Answer = ({ answer }) => {
console.log(answer);
  const date = dayjs(answer.date).format('MMMM DD, YYYY')

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  const helpfulOnClickHandler = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer.answer_id}/helpful`, {}, options)
      .then(response => {
        const newAnswer = answer.helpfullness++;
      })
      .catch(err => console.log(err));
  };

  const reportOnClickHandler = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer.answer_id}/report`, {}, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <div className="answer">
      <p className="answer-body">A: {answer.body}</p>
      {answer.photos.map((photo) => <img src={photo.url} key={photo.id} />)}
      <div className="answer-info">
        <p>{answer.answerer_name}</p>
        <p>{date}</p>
      </div>
      <div className="answer-options">
        <div className="answer-helpful-option">
          <p>Helpful?</p>
          <button type="submit" onClick={helpfulOnClickHandler}>Yes ({answer.helpfulness})</button>
        </div>
        <div className="answer-report-option">
          <p>Report?</p>
          <button type="submit" onClick={reportOnClickHandler}>Report</button>
        </div>
      </div>
    </div>
  );
};

export default Answer;

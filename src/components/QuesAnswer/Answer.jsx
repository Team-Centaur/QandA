import React, { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import './Answer.css';

const Answer = ({ answer }) => {
  const [answerHelpfulness, setAnswerHelpfulness] = useState(answer.helpfulness);
  const [isAnswerHelpfulClicked, setIsAnswerHelpfulClicked] = useState(false);
  const [isAnswerReportClicked, setIsAnswerReportClicked] = useState(false);
  const date = dayjs(answer.date).format('MMMM DD, YYYY')

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  const helpfulOnClickHandler = () => {
    setIsAnswerHelpfulClicked(true);
    if (!isAnswerHelpfulClicked) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer.answer_id}/helpful`, {}, options)
        .then(response => {
          setAnswerHelpfulness(answerHelpfulness+1)
        })
        .catch(err => {
          setIsAnswerHelpfulClicked(false);
          console.log(err);
        });
    }
  };

  const reportOnClickHandler = () => {
    setIsAnswerReportClicked(true);
    if (!isAnswerReportClicked) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answer.answer_id}/report`, {}, options)
        .then(response => console.log(response))
        .catch(err => {
          setIsAnswerReportClicked(false);
          console.log(err);
        });
    }
  };

  return (
    <div className="answer">
      <p className="answer-body">A: {answer.body}</p>
      {answer.photos.map((photo) => <img src={photo.url} key={photo.id} />)}
      <div className="answer-info">
        <p className="username">{answer.answerer_name}</p>
        <p className="date">{date}</p>
      </div>
      <div className="answer-options">
        <div className="answer-helpful-option">
          <p>Helpful?</p>
          <button type="submit" onClick={helpfulOnClickHandler}>Yes ({answerHelpfulness})</button>
        </div>
        <div className="answer-report-option">
          <p>Report?</p>
          <button type="submit" onClick={reportOnClickHandler}>
            {isAnswerReportClicked && <>Reported</>}
            {!isAnswerReportClicked && <>Report</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;

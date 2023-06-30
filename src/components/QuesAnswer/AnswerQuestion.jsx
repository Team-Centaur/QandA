import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './AnswerQuestion.css';

const AnswerQuestion = ({ isAnswerQuestion, setIsAnswerQuestion, questionId, answers, setAnswers }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [answerBody, setAnswerBody] = useState('');

  const usernameOnChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const answerBodyOnChangeHandler = (event) => {
    setAnswerBody(event.target.value);
  };

  const createAnswerHandler = () => {
    event.preventDefault();

    const options = {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    };

    const data = {
      body: answerBody,
      name: username,
      email: email,
      photos: [], // TODO: set up photos
    };

    axios.post(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`,
        data,
        options
      )
      .then(response => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers?page=${1}&count=${1000}`, options)
          .then(response => {
            setAnswers(response.data.results);
            answerQuestionCloseHandler();
          })
      })
      .catch((err) => console.error(err));
  };

  const answerQuestionCloseHandler = () => {
    setIsAnswerQuestion(true);
    document.body.style.overflow = 'auto';
  };

  return !isAnswerQuestion && ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="answerQuestionModal">
        <button className="answerQuestionClose" onClick={answerQuestionCloseHandler}>X</button>
        <h2 className="answerQuestionTitle">Answer Question</h2>
        <form className="answerQuestionForm">
          <input placeholder="username" onChange={usernameOnChangeHandler} />
          <input placeholder="email" onChange={emailOnChangeHandler} />
          <textarea
            type="text"
            cols="50"
            rows="5"
            placeholder="answer"
            onChange={answerBodyOnChangeHandler}
          />
          {/* TODO: figure out photos */}
          <button className="answerQuestionSubmit" type="submit" onClick={createAnswerHandler}>
            Submit
          </button>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default AnswerQuestion;

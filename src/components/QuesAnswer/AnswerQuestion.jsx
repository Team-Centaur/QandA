import React, { useState } from 'react';
import axios from 'axios';

const AnswerQuestion = ({ isAnswerQuestion, questionId }) => {
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

    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`, data, options)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <form hidden={isAnswerQuestion}>
      <input placeholder="username" onChange={usernameOnChangeHandler} />
      <input placeholder="email" onChange={emailOnChangeHandler} />
      <textarea type="text" cols="50" rows="5" placeholder="answer" onChange={answerBodyOnChangeHandler} />
      {/* TODO: figure out photos */}
      <button type="submit" onClick={createAnswerHandler}>Submit</button>
    </form>
  );
};

export default AnswerQuestion;
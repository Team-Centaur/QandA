import React, { useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import './AnswerQuestion.css';

const AnswerQuestion = ({ isAnswerQuestion, setIsAnswerQuestion, question, answers, setAnswers, product }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [answerBody, setAnswerBody] = useState('');
  const [addImagesCount, setAddImagesCount] = useState(0);
  const [answerImages, setAnswerImages] = useState({});
  const [answerUsernameValid, setAnswerUsernameValid] = useState(true);
  const [answerEmailValid, setAnswerEmailValid] = useState(true);
  const [answerBodyValid, setAnswerBodyValid] = useState(true);

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

    const emailRegex = /\S+@\S+\.\S+/;
    if (username.length > 0) {
      setAnswerUsernameValid(true);
    } else {
      setAnswerUsernameValid(false);
      return;
    }
    if (email.match(emailRegex)) {
      setAnswerEmailValid(true);
    } else {
      setAnswerEmailValid(false);
      return;
    }
    if (answerBody.length > 0) {
      setAnswerBodyValid(true);
    } else {
      setAnswerBodyValid(false);
      return;
    }

    const options = {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    };

    const data = {
      body: answerBody,
      name: username,
      email: email,
      photos: Object.values(answerImages),
    };

    axios.post(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers`,
        data,
        options
      )
      .then(response => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers?page=${1}&count=${1000}`, options)
          .then(response => {
            setAnswers(response.data.results);
            answerQuestionCloseHandler();
          })
      })
      .then(response => {
        setAddImagesCount(0);
        setAnswerImages({});
      })
      .catch((err) => console.error(err));
  };

  const answerQuestionCloseHandler = () => {
    setIsAnswerQuestion(true);
    setAnswerImages({});
    document.body.style.overflow = 'auto';
  };

  const addFileButtonOnClickHandler = (event) => {
    event.preventDefault();

    addImagesCount < 5 ? setAddImagesCount(addImagesCount+1) : null;
  };

  const addImageOnChangeHandler = (event, num) => {
    let temp = {...answerImages};
    temp[num] = event.target.value;
    setAnswerImages(temp);
  }

  return !isAnswerQuestion && ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="answerQuestionModal">
        <button className="answerQuestionClose" onClick={answerQuestionCloseHandler}>X</button>
        <h2 className="answerQuestionTitle">Submit your Answer</h2>
        <h3>{product.name}</h3>
        <form className="answerQuestionForm">
          <input placeholder="Example: jack543!" maxLength="60" onChange={usernameOnChangeHandler} />
          {answerUsernameValid ? null : <p className="form-error">Enter a username</p>}
          <p>For privacy reasons, do not use your full name or email address</p>
          <input placeholder="Example: jack@email.com" maxLength="60" onChange={emailOnChangeHandler} />
          {answerEmailValid ? null : <p className="form-error">Enter a valid email</p>}
          <p>For authentication reasons, you will not be emailed</p>
          <textarea
            type="text"
            cols="50"
            rows="5"
            maxLength="1000"
            placeholder="answer"
            onChange={answerBodyOnChangeHandler}
          />
          {answerBodyValid ? null : <p className="form-error">Enter an answer</p>}
          {Array.from({length: addImagesCount}, (v, i) => i).map(num => <input placeholder="Enter an image url" type="text" onChange={(event) => addImageOnChangeHandler(event, num)} />)}
          <button type="submit" onClick={addFileButtonOnClickHandler}>Add File</button>
          <ul>
            {Object.values(answerImages).map(image => <li><img src={image} width="4rem" height="4rem" /></li>)}
          </ul>
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

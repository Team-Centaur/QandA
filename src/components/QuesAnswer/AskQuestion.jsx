import React, { useState } from 'react';
import ReactDom from 'react-dom';
// import PropTypes from 'prop-types';
import axios from 'axios';
import './AskQuestion.css';

const AskQuestion = ({ isAskQuestion, setIsAskQuestion, product, questions, setQuestions }) => {
  const [questionBody, setQuestionBody] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');
  const [questionNameValid, setQuestionNameValid] = useState(true);
  const [questionEmailValid, setQuestionEmailValid] = useState(true);
  const [questionBodyValid, setQuestionBodyValid] = useState(true);

  const questionBodyOnChangeHandler = (event) => {
    setQuestionBody(event.target.value);
  };

  const questionNameOnChangeHandler = (event) => {
    setQuestionName(event.target.value);
  };

  const questionEmailOnChangeHandler = (event) => {
    setQuestionEmail(event.target.value);
  };

  // send form data to api when submit button clicked
  const createQuestionHandler = (event) => {
    event.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (questionName.length > 0) {
      setQuestionNameValid(true);
    } else {
      setQuestionNameValid(false);
      return;
    }
    if (questionEmail.match(emailRegex)) {
      setQuestionEmailValid(true);
    } else {
      setQuestionEmailValid(false);
      return;
    }
    if (questionBody.length > 0) {
      setQuestionBodyValid(true);
    } else {
      setQuestionBodyValid(false);
      return;
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.REACT_APP_API_KEY,
      },
    };

    const data = {
      body: questionBody,
      name: questionName,
      email: questionEmail,
      product_id: product.id,
    };

    axios
      .post(
        'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions',
        data,
        options
      )
      .then((response) => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product.id}&page=${1}&count=${1000}`,options)
          .then(response => {
            setQuestions(response.data.results);
            closeModal();
          })
      })
      .catch((err) => console.error(err));
  };

  const closeModal = () => {
    setIsAskQuestion(true);
    setQuestionNameValid(true);
    setQuestionEmailValid(true);
    setQuestionBodyValid(true);
    setQuestionBody('');
    setQuestionEmail('');
    setQuestionName('');
    document.body.style.overflow = 'auto';
  };
  return !isAskQuestion && ReactDom.createPortal(
    <>
      <div className="overlay"/>
      <div className="askQuestionModal">
        <button className="askQuestionClose" onClick={closeModal}>X</button>
        <h2 className="askQuestionTitle">About the {product.name}</h2>
        <form
          className="askQuestionForm"
        >
          <input
            type="text"
            className="askQuestionNameInput"
            maxLength="60"
            placeholder="Example: jackson11!"
            onChange={questionNameOnChangeHandler}
            value={questionName}
          />
          {questionNameValid ? null : <p className="form-error">Enter a username</p>}
          <p>For privacy reasons, do not use your full name or email address</p>
          <input
            type="text"
            className="askQuestionEmailInput"
            maxLength="60"
            placeholder="Example: jackson@email.com"
            onChange={questionEmailOnChangeHandler}
            value={questionEmail}
          />
          {questionEmailValid ? null : <p className="form-error">Enter a valid email</p>}
          <p>For authentication reasons, you will not be emailed</p>
          <textarea
            type="text"
            rows="5"
            cols="50"
            maxLength="1000"
            placeholder="Enter question here"
            onChange={questionBodyOnChangeHandler}
            value={questionBody}
          />
          {questionBodyValid ? null : <p className="form-error">Enter a question</p>}
          <button
            type="submit"
            className="submitAskQuestionButton"
            onClick={createQuestionHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default AskQuestion;

// AskQuestion.propTypes = {
//   isAskQuestion: PropTypes.boolean.isRequired,
//   product: PropTypes.Object.isRequired,
// };

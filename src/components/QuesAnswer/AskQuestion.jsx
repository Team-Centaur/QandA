import React, { useState } from 'react';
import ReactDom from 'react-dom';
// import PropTypes from 'prop-types';
import axios from 'axios';
import './AskQuestion.css';

const AskQuestion = ({ isAskQuestion, setIsAskQuestion, product, questions, setQuestions }) => {
  const [questionBody, setQuestionBody] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');

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
    document.body.style.overflow = 'auto';
  };

  return !isAskQuestion && ReactDom.createPortal(
    <>
      <div className="overlay"/>
      <div className="askQuestionModal">
        <button className="askQuestionClose" onClick={closeModal}>X</button>
        <h2 className="askQuestionTitle">Ask a question</h2>
        <form
          className="askQuestionForm"
          value={questionBody}
        >
          <input
            className="askQuestionNameInput"
            maxLength="60"
            placeholder="Name"
            onChange={questionNameOnChangeHandler}
            value={questionName}
          />
          <input
            className="askQuestionEmailInput"
            maxLength="60"
            placeholder="Email"
            onChange={questionEmailOnChangeHandler}
            value={questionEmail}
          />
          <textarea
            type="text"
            rows="5"
            cols="50"
            maxLength="1000"
            placeholder="question"
            onChange={questionBodyOnChangeHandler}
          />
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

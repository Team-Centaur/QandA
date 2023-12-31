import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import Search from './Search.jsx';
import AskQuestion from './AskQuestion.jsx';
import Display from './Display.jsx';
import './QuesAnswer.css';

const QuesAnswer = ({ product }) => {
  const [questions, setQuestions] = useState([]);
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [isNoMoreQuestions, setIsNoMoreQuestions] = useState(false);
  const [isAskQuestion, setIsAskQuestion] = useState(true);

  const params = {
    product_id: product.id,
    page: 1,
    count: 10,
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  // get data and store questions
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${product.id}&page=${1}&count=${1000}`,options)
      .then((response) => {
        if (response.data.results.length > 0) {
          const sortedResults = response.data.results.sort(
            (a, b) => b.question_helpfulness - a.question_helpfulness
          );
          setQuestions(sortedResults);
          setDisplayQuestions([...sortedResults.slice(0, 4)]);
          if (response.data.results.length <= 4) {
            setIsNoMoreQuestions(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [product]);

  // expand more questions on button click
  const moreQuestionsButtonClickHandler = () => {
    const NUMBER_OF_QUESTIONS_LEFT = 3;
    const NUMBER_OF_QUESTIONS_TO_LOAD = 2;
    if (questions.length - displayQuestions.length < NUMBER_OF_QUESTIONS_LEFT) {
      setDisplayQuestions(questions);
      setIsNoMoreQuestions(true);
    } else {
      setDisplayQuestions(
        questions.slice(
          0,
          displayQuestions.length + NUMBER_OF_QUESTIONS_TO_LOAD
        )
      );
    }
  };

  // make ask a question form appear when ask a question button is clicked
  const addQuestionHandler = () => {
    setIsAskQuestion(false);
    document.body.style.overflow = 'hidden';
  };

  return (
    <section className="ques-ans-main" data-testid="quesAnswerComponent" >
      <h2>QUESTIONS & ANSWERS</h2>
      <Search setDisplayQuestions={setDisplayQuestions} questions={questions} />
      <div className="display">
        <Display questions={displayQuestions} product={product} />
      </div>
      <button type="submit" className="moreQuestionsButton" onClick={moreQuestionsButtonClickHandler} hidden={isNoMoreQuestions}>
        More Answered Questions
        {` (${questions.length - displayQuestions.length})`}
      </button>
      <button
        type="submit"
        className="askQuestionButton"
        onClick={(event) => {
          addQuestionHandler(event);
        }}
      >
        Ask A Question
      </button>
      <AskQuestion isAskQuestion={isAskQuestion} setIsAskQuestion={setIsAskQuestion} product={product} questions={questions} setQuestions={setQuestions} />
    </section>
  );
};

export default QuesAnswer;

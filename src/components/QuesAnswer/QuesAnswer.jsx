import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Search from './Search.jsx';
import AskQuestion from './AskQuestion.jsx';

const QuesAnswer = ({ product }) => {
  const [questions, setQuestions] = useState([]);
  const [isAskQuestion, setIsAskQuestion] = useState(true);

  useEffect(() => {

  }, []);

  const addQuestionHandler = () => {
    setIsAskQuestion(false);
  };

  return (
    <section>
      <h2>QUESTIONS & ANSWERS</h2>
      <Search />
      {questions.map((question) => <question question={question} key={question.id} />)}
      <h5>LOAD MORE ANSWERS</h5>
      <button type="submit" className="loadQuestionButton">MORE ANSWERED QUESTIONS</button>
      <button
        type="submit"
        className="askQuestionButton"
        onClick={(event) => { addQuestionHandler(event); }}
      >
        ASK A QUESTION
      </button>
      <AskQuestion isAskQuestion={isAskQuestion} product={product}/>
    </section>
  );
};

export default QuesAnswer;

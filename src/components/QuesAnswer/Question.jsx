import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import Answer from './Answer.jsx';
import AnswerQuestion from './AnswerQuestion.jsx';
import './Question.css';

const Question = ({ question, product }) => {
  const [answers, setAnswers] = useState([]);
  const [displayAnswers, setDisplayAnswers] = useState([]);
  const [isNoMoreAnswers, setIsNoMoreAnswers] = useState(false);
  const [isAnswerQuestion, setIsAnswerQuestion] = useState(true);
  const [isQuestionHelpfulClicked, setIsQuestionHelpfulClicked] = useState(false);
  const [isQuestionReportedClicked, setIsQuestionReportedClicked] = useState(false);
  const [questionHelpfulness, setQuestionHelpfulness] = useState(question.question_helpfulness);

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  // get data and store answers for question
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers?page=${1}&count=${1000}`, options)
      .then((response) => {
        if (response.data.results.length > 0) {
          const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness);
          setAnswers(sortedResults);
          setDisplayAnswers([...sortedResults.slice(0, 2)]);
        }
      })
      .catch((err) => console.log(err));
  }, [question]);

  // expand answers section when more answers button is clicked
  const moreAnswersButtonClickHandler = () => {
    setDisplayAnswers(answers);
    setIsNoMoreAnswers(true);
  };

  const answerQuestionButtonClickHandler = () => {
    setIsAnswerQuestion(false);
    document.body.style.overflow = 'hidden';
  };

  const collapseAnswersOnClickHandlers = () => {
    setDisplayAnswers([...answers.slice(0, 2)]);
    setIsNoMoreAnswers(false);
  };

  const helpfulOnClickHandler = () => {
    setIsQuestionHelpfulClicked(true);
    if (!isQuestionHelpfulClicked) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/helpful`, {}, options)
        .then(response => setQuestionHelpfulness(questionHelpfulness+1))
        .catch(err => {
          setIsQuestionHelpfulClicked(false);
          console.log(err);
        });
    }
  };

  const reportOnClickHandler = () => {
    setIsQuestionReportedClicked(true);
    if (!isQuestionReportedClicked) {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/report`, {}, options)
        .then(response => console.log(response))
        .catch(err => {
          setIsQuestionReportedClicked(false);
          console.log(err);
        });
    }
  };

  return (
    <div className="question">
      <p className="question-body">Q: {question.question_body}</p>
      <div className="question-options">
        <div className="question-helpful-option">
          <p>Helpful?</p>
          <button type="submit" onClick={helpfulOnClickHandler}>Yes ({questionHelpfulness})</button>
        </div>
        <div className="question-report-option">
          <p>Report?</p>
          <button type="submit" onClick={reportOnClickHandler}>
            {isQuestionReportedClicked ? <>Reported</> : <>Report</>}
          </button>
        </div>
      </div>
      {displayAnswers.map((answer) => <Answer answer={answer} key={v4()} />)}
      <button type="submit" onClick={moreAnswersButtonClickHandler} hidden={isNoMoreAnswers}>
        See More Answers
        {` (${answers.length - displayAnswers.length})`}
      </button>
      <button type="submit" onClick={collapseAnswersOnClickHandlers} hidden={!isNoMoreAnswers}>Collapse Answers</button>
      <button type="submit" onClick={answerQuestionButtonClickHandler}>
        Answer this question
      </button>
      <AnswerQuestion isAnswerQuestion={isAnswerQuestion} setIsAnswerQuestion={setIsAnswerQuestion} question={question} answers={answers} setAnswers={setAnswers} product={product} />
    </div>
  );
};

export default Question;

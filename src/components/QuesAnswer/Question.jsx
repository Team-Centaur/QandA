import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import AnswerQuestion from './AnswerQuestion.jsx';

const Question = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [displayAnswers, setDisplayAnswers] = useState([]);
  const [isNoMoreAnswers, setIsNoMoreAnswers] = useState(false);
  const [isAnswerQuestion, setIsAnswerQuestion] = useState(true);

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  // get data and store questions
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question.question_id}/answers?page=${1}&count=${1000}`, options)
      .then((response) => {
        console.log(response);
        if (response.data.results.length > 0) {
          const sortedResults = response.data.results.sort((a, b) => b.helpfulness - a.helpfulness);
          setAnswers(sortedResults);
          setDisplayAnswers([sortedResults[0]]);
        }
      })
      .catch((err) => console.log(err));
  }, [question]);

  // expand answers section when more answers button is clicked
  const moreAnswersButtonClickHandler = () => {
    const NUMBER_OF_ANSWERS_LEFT = 3;
    const NUMBER_OF_ANSWERS_TO_LOAD = 2;
    if (answers.length - displayAnswers.length < NUMBER_OF_ANSWERS_LEFT) {
      setDisplayAnswers(answers);
      setIsNoMoreAnswers(true);
    } else {
      setDisplayAnswers(answers.slice(0, displayAnswers.length + NUMBER_OF_ANSWERS_TO_LOAD));
    }
  };

  const answerQuestionButtonClickHandler = () => {
    setIsAnswerQuestion(false);
  };

  const collapseAnswersOnClickHandlers = () => {
    setDisplayAnswers([answers[0]]);
    setIsNoMoreAnswers(false);
  };

  return (
    <div>
      <p>Q: {question.question_body}</p>
      {displayAnswers.map((answer) => <Answer answer={answer} key={answer.id} />)}
      <button type="submit" onClick={moreAnswersButtonClickHandler} hidden={isNoMoreAnswers}>
        See More Answers
        {` (${answers.length - displayAnswers.length})`}
      </button>
      <button type="submit" onClick={collapseAnswersOnClickHandlers} hidden={!isNoMoreAnswers}>Collapse Answers</button>
      <button type="submit" onClick={answerQuestionButtonClickHandler}>
        Answer this question
      </button>
      <AnswerQuestion isAnswerQuestion={isAnswerQuestion} questionId={question.question_id} />
    </div>
  );
};

export default Question;

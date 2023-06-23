import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

const Question = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [displayAnswers, setDisplayAnswers] = useState([]);
  const [isMoreAnswers, setIsMoreAnswers] = useState(false);

  useEffect(() => {
    if (Object.values(question.answers).length > 0) {
      setAnswers(Object.values(question.answers));
      setDisplayAnswers([Object.values(question.answers)[0]]);
      if (answers.length === displayAnswers) {
        setIsMoreAnswers(false);
      } else {
        setIsMoreAnswers(true);
      }
    }
  }, []);

  const moreAnswersButtonClickHandler = (event) => {
    const NUMBER_OF_ANSWERS_LEFT = 3;
    const NUMBER_OF_ANSWERS_TO_LOAD = 2;
    if (answers - displayAnswers < NUMBER_OF_ANSWERS_LEFT) {
      setDisplayAnswers(answers);
      setIsMoreAnswers(false);
    } else {
      setDisplayAnswers(answers.slice(0, displayAnswers.length + NUMBER_OF_ANSWERS_TO_LOAD));
    }
  };

  return (
    <div>
      <h4>This is a question</h4>
      <p>{question.question_body}</p>
      {displayAnswers.map((answer) => <Answer answer={answer} key={answer.id} />)}
      <button type="submit" onClick={moreAnswersButtonClickHandler}>
        More Answers
        {` (${answers.length - displayAnswers.length})`}
      </button>
    </div>
  );
};

export default Question;

import React from 'react';
import Question from './Question.jsx';

const Display = ({ questions }) => {
console.log(questions);
  return (
    <>
      {questions.map((question) => <Question question={question} key={question.question_id} />)}
    </>
  );
};

export default Display;

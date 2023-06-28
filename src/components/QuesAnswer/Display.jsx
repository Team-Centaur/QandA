import React from 'react';
import Question from './Question.jsx';

const Display = ({ questions, product }) => {

  return (
    <>
      {questions.map((question) => <Question question={question} product={product} key={question.question_id} />)}
    </>
  );
};

export default Display;

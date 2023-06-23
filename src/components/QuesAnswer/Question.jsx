import React from 'react';
import Answer from './Answer.jsx';

const Question = ({ question }) => {
  console.log(question);

  const answers = Object.values(question.answers);

  return (
    <div>
      <h4>This is a question</h4>
      <p>{question.question_body}</p>
      {answers.map((answer) => <Answer answer={answer} key={answer.id} />)}
    </div>
  );
};

export default Question;

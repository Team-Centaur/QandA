import React from 'react';

const Answer = ({ answer }) => {
  console.log(answer);

  return (
    <div>
      <h4>This is an Answer</h4>
      <p>{answer.body}</p>
    </div>
  );
};

export default Answer;

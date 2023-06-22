import React from 'react';
import { useState } from 'react';
import { Search } from './Search.jsx';

const QuesAnswer = (props) => {

  const [questions, setQuestions] = useState([]);

  return(
    <section>
      <h2>QUESTIONS & ANSWERS</h2>
      <Search />
      {questions.map(question => <question question={question} key={question.id}/>)}
      <h5>LOAD MORE ANSWERS</h5>
      <button className='loadQuestionButton'>MORE ANSWERED QUESTIONS</button>
      <button className='askQuestionButton'>ASK A QUESTION +</button>
    </section>
  )
}
export default QuesAnswer;
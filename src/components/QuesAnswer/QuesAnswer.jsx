import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import AskQuestion from './AskQuestion.jsx';

const QuesAnswer = ({product}) => {

  const [questions, setQuestions] = useState([]);
  const [isAskQuestion, setIsAskQuestion] = useState(true);

  useEffect(() => {

  }, []);

  const addQuestionHandler = (event) => {
    setIsAskQuestion(false);
  };

  return(
    <section>
      <h2>QUESTIONS & ANSWERS</h2>
      <Search />
      {questions.map(question => <question question={question} key={question.id}/>)}
      <h5>LOAD MORE ANSWERS</h5>
      <button className='loadQuestionButton'>MORE ANSWERED QUESTIONS</button>
      <button className='askQuestionButton' onClick={(event) => {
        addQuestionHandler(event)
      }}>ASK A QUESTION</button>
      <AskQuestion isAskQuestion={isAskQuestion} product={product}/>
    </section>
  );
};

export default QuesAnswer;

import React, { useState } from 'react';

const Search = ({ setDisplayQuestions, questions }) => {
  const [search, setSearch] = useState('');

  const searchOnChangeHandler = (event) => {
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const filteredQuestions = questions.filter((question) => {
        if (question.question_body.includes(event.target.value)) {
          return question.question_body;
        }
      });
      setDisplayQuestions(filteredQuestions);
    } else {
      setDisplayQuestions([questions[0]]);
    }
  };

  return (
    <>
      <input type='search' placeholder='Search for a question' onChange={searchOnChangeHandler} />
    </>
  )
};

export default Search;

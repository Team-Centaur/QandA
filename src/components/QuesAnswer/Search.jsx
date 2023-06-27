import React, { useState } from 'react';

const Search = ({ setDisplayQuestions }) => {
  const [search, setSearch] = useState('');

  const searchOnChangeHandler = (event) => {
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      setDisplayQuestions([]);
    } else {
      setDisplayQuestions([]);
    }
  };

  return (
    <>
      <input type='search' placeholder='Search for a question' onChange={searchOnChangeHandler} />
      <button className='questionSearchButton'>Search</button>
    </>
  )
};

export default Search;

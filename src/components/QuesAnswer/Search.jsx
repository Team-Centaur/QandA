import React from 'react';

const Search = (props) => {
  return (
    <>
      <input type='search' placeholder='Search for a question'></input>
      <button className='questionSearchButton'>Search</button>
    </>
  )
};

export default Search;

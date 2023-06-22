import React from 'react';

export const Search = (props) => {
  return (
    <>
      <input type='text' placeholder='Search for a question'></input>
      <button className='questionSearchButton'>Search</button>
    </>
  )
};
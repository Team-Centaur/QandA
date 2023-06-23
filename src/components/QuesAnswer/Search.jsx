import React from 'react';


export const Search = (props) => {
  return (
    <>
      <input type='search' placeholder='Search for a question'></input>
      <button className='questionSearchButton'>Search</button>
    </>
  )
};
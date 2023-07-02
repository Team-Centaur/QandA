import React from 'react';

const SortOrderButton = ({ sortOrder }) => {
  return (
    <div className='sortOrderButton'>
      <span>Sort on </span>
      <label htmlFor='sortOrderSelect'>{sortOrder}</label>
      <select id='sortOrderSelect'>
        <option value='relevant' selected>Relevant</option>
        <option value='relevant'>Helpful</option>
        <option value='helpful'>Newest</option>
      </select>
    </div>
  );
}

export default SortOrderButton;
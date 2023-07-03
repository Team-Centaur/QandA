import React from 'react';

const SortOrderButton = ({ sortOrder, changeSortOrder }) => {
  return (
    <div className='sortOrderButton'>
      <label htmlFor='sortOrderSelect'>Sort on </label>
      <select id='sortOrderSelect' onChange={changeSortOrder}>
        <option value='relevant' defaultValue>Relevant</option>
        <option value='helpful'>Helpful</option>
        <option value='newest'>Newest</option>
      </select>
    </div>
  );
}

export default SortOrderButton;
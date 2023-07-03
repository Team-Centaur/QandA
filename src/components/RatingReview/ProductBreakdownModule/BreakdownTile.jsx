import React from 'react';

const BreakdownTile = ({ characteristic, value }) => {
  console.log(characteristic, value);
  return (
    <div>
      <h4>{characteristic}</h4>
      {value}
    </div>
  );
};

export default BreakdownTile;
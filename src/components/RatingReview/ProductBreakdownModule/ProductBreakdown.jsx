import React from 'react';
import BreakdownTile from './BreakdownTile.jsx';

const ProductBreakdown = ({ characteristics }) => {
  let charas = Object.entries(characteristics);
   return (
    <div>
      <h1>Product Breakdown</h1>
      {charas.map((chara) => (
        <BreakdownTile characteristic={chara[0]} value={chara[1].value} key={chara[0]}/>
      ))}
    </div>
  );
}

export default ProductBreakdown;
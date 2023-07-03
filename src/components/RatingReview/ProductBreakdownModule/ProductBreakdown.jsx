import React from 'react';
import BreakdownTile from './BreakdownTile.jsx';
import characteristicMeanings from '../characteristicMeanings.js';

import './ProductBreakdown.css';

const ProductBreakdown = ({ characteristics }) => {
  let charas = Object.entries(characteristics);

   return (
    <div className='productBreakdown reviewsComponent'>
      <h1>Product Breakdown</h1>
      {charas.map((chara) => {
        let lowValue = characteristicMeanings[chara[0]][0];
        let highValue = characteristicMeanings[chara[0]][4];
        return (
          <BreakdownTile
            characteristic={chara[0]}
            value={chara[1].value}
            lowValue={lowValue}
            highValue={highValue}
            key={chara[0]}
          />
        );
      })}
    </div>
  );
}

export default ProductBreakdown;
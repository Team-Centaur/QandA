import React, { useContext } from 'react';
import BreakdownTile from './BreakdownTile.jsx';
import CurrContext from '../../../store/curr-item-context.jsx';
import characteristicMeanings from '../characteristicMeanings.js';

import './ProductBreakdown.css';

const ProductBreakdown = ({ characteristics }) => {
  const currCtx = useContext(CurrContext);
  let charas = Object.entries(characteristics);

   return (
    <div className={`productBreakdown reviewsComponent ${currCtx.currTheme}`}data-testid='productBreakdown'>
      <h2>Product Breakdown</h2>
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
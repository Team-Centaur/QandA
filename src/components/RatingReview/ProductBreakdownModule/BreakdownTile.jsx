import React, { useContext } from 'react';
import CurrContext from '../../../store/curr-item-context.jsx';
import './ProductBreakdown.css'

const BreakdownTile = ({ characteristic, value, lowValue, highValue }) => {

  const currCtx = useContext(CurrContext);
  const charBarStyles = {
    height: '8px',
    width: '90%',
    backgroundColor: 'LightGray',
    borderRadius: '50px',
    position: 'relative',
    left: '5%',
    display: 'inline-block'
  };

  const charBarFillStyles = {
    position: 'relative',
    height: '100%',
    width: '8px',
    left: (value / 5 * 100 + '%'),
    backgroundColor: 'black',
    borderRadius: 'inherit',
  };

  return (
    <div className={`breakdownTile ${currCtx.currTheme}`} data-testid='productBreakdownTile'>
      <h4 style={{textAlign:'center'}}>{characteristic}</h4>
      <div className='charBar' style={charBarStyles}>
        <div className='charBarFill' style={charBarFillStyles}>
        </div>
      </div>
      <br></br>
      <span>{lowValue}</span>
      <span style={{float: 'right'}}>{highValue}</span>
    </div>
  );
};

export default BreakdownTile;
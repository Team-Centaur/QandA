import React from 'react';
import {useState, useEffect , useRef, useContext} from 'react';
import CurrContext from '../../../../../store/curr-item-context.jsx';

const QuantityMenu = ({currentStyle, sizeSelected, setQuantitySelected, quantitySelected}) => {
  const [quantityArray, setQuantityArray] = useState(null);
  const selectRef = useRef(null);
  const currCtx = useContext(CurrContext)
  useEffect(()=> {
    if(sizeSelected) {
      const quantity = sizeSelected[1].quantity >=15? 15: sizeSelected[1].quantity;
      const optionsArray = [];
      for(let i = 1; i <= quantity; i++) {
        optionsArray.push(
          <option data-testid = "quantity-option" key ={i} value={i}>{i}</option>
        )
      }
      setQuantityArray(optionsArray);
      selectRef.current.selectedIndex = 0;
    }
  }, [currentStyle, sizeSelected])
  if(sizeSelected) {
    return (
      <select
        onChange={(e) => {setQuantitySelected(selectRef.current.value)}}
        ref={selectRef}
        data-testid = "quantity-selector"
        className={`quantity-selector ${currCtx.currTheme}`}
      >
        {quantityArray}
      </select>
    )
  }
  return (
    <select disabled>
      <option>-</option>
    </select>
  )
}

export default QuantityMenu;

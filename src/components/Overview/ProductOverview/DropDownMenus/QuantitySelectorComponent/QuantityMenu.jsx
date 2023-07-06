import React from 'react';
import {useState, useEffect , useRef} from 'react';

const QuantityMenu = ({currentStyle, sizeSelected, setQuantitySelected, quantitySelected}) => {
  const [quantityArray, setQuantityArray] = useState(null);
  const selectRef = useRef(null)
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

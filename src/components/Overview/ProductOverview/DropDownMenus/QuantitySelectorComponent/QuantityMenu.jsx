import React from 'react';
import {useState, useEffect , useRef} from 'react';

const QuantityMenu = ({currStyle, sizeSelected, setQuantitySelected, quantitySelected}) => {
  const [quantityArray, setQuantityArray] = useState(null);
  const selectRef = useRef(null)
  useEffect(()=> {
    if(sizeSelected) {
      console.log('Quantiy', quantitySelected);
      const quantity = sizeSelected[1].quantity >=15? 15: sizeSelected[1].quantity;
      const optionsArray = [];
      console.log('options', optionsArray)
      for(let i = 1; i <= quantity; i++) {
        optionsArray.push(
          <option key ={i} value={i}>{i}</option>
        )
      }
      setQuantityArray(optionsArray);
      selectRef.current.selectedIndex = 0;
    }
  }, [currStyle, sizeSelected])
  if(sizeSelected) {
    return (
      <select
        onChange={(e) => {setQuantitySelected(selectRef.current.value)}}
        ref={selectRef}
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

import React from 'react';
import { useState, useEffect } from 'react';

const SizeMenu = ({currentStyle, setSizeSelected}) =>{
  const [sizesArray, setSizesArray] = useState(null);
  useEffect(() => {
    if(currentStyle.skus) {
      setSizesArray(Object.entries(currentStyle.skus)); // returns an array of subarray of key-value
      console.log(currentStyle.skus);
    }
  }, [currentStyle])

  const onSizeSelect = (event) => {
    const sku = event.target.value; // gives the sku of option
    for(let key in currentStyle.skus) {
      if(key === sku) {
        setSizeSelected([sku, currentStyle.skus[key]]) // give an array of sku and obj containing quantity and size
      }
    }
    // setSizeSelected(sizeArray); // state will be utilized in quantity selector
  }
  if(sizesArray) {
    return (
      <select name="Select Size" onChange ={(e) => onSizeSelect(e)}>
        <option value="Select Size">Select Size</option>
        {sizesArray.map((size) =>{
          const sku = size[0]
          const info = size[1];
          if(info.quantity > 0) {
            return (
                <option key ={sku} value={sku}> {info.size}</option>
            )
          }
        })}
      </select>
    )
  }
  return (
    <select disabled>
      <option> OUT OF STOCK</option>
    </select>
  )
}
export default SizeMenu;

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import '../styles/DropDownMenus.css';
import CurrContext from '../../../../../store/curr-item-context.jsx';

const SizeMenu = ({currentStyle, setSizeSelected}) =>{
  const [sizesArray, setSizesArray] = useState(null);
  const currCtx = useContext(CurrContext);

  useEffect(() => {
    if(currentStyle.skus) {

      setSizesArray(Object.entries(currentStyle.skus)); // returns an array of subarray of key-value
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
      <select className={`sizes-selector ${currCtx.currTheme}`} data-testid ="sizes-selector" name="Select Size" onChange ={(e) => onSizeSelect(e)}>
        <option data-testid = "select-option" value="Select Size">Select Size</option>
        {sizesArray.map((size) =>{
          const sku = size[0]
          const info = size[1];
          if(info.quantity > 0) {
            return (
                <option data-testid = "select-option" key ={sku} value={sku}> {info.size}</option>
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

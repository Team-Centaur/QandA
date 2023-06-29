import React from 'react';
import { useState } from 'react';
import IndividualStyleComponent from './IndividualStyleComponent.jsx';
import './ProductStylesCSS/styles.css';

const AllStyles = ({dataObj, setCurrStyle, setOnSale}) => {
  const [styles, setStyles] = useState(dataObj.styles);
  const onStyleHandler = (style) => {
    setCurrStyle(style);
    style.sale_price ? setOnSale(true) : setOnSale(false);
  }
  if(styles) {
    return (
      <div className="all-styles-container" >
        {styles.map((style) => {
          return <IndividualStyleComponent key={style.style_id} style={style} onStyleHandler={onStyleHandler} />
        })}
      </div>
    );
  }
  return null;
}
export default AllStyles;

//style={{display:'flex', felxDirection: 'row', gap:'0.7rem'}}
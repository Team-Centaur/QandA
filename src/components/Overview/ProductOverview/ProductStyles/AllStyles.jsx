import React from 'react';
import { useState, useEffect } from 'react';
import IndividualStyleComponent from './IndividualStyleComponent.jsx';
import './ProductStylesCSS/styles.css';

const AllStyles = ({ styles, setCurrentStyle, setOnSale }) => {
  const [isSelected, setIsSelected] = useState(styles[0]);

  useEffect(() => {
    setIsSelected(styles[0]);
  }, [styles]);
  console.log('ALL STYLES', styles);
  console.log('SELECTED', isSelected);
  const onStyleHandler = (style) => {
    setCurrentStyle(style);
    setIsSelected(style);
    style.sale_price ? setOnSale(true) : setOnSale(false);
  };
  if (styles) {
    return (
      <div className="all-styles-container">
        {styles.map((style) => {
          return (
            <IndividualStyleComponent
              key={style.style_id}
              style={style}
              onStyleHandler={onStyleHandler}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    );
  }
  return null;
};
export default AllStyles;

//style={{display:'flex', felxDirection: 'row', gap:'0.7rem'}}

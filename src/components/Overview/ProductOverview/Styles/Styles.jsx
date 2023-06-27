import React from 'react';
import { useState } from 'react';

const Styles = ({dataObj}) => {
  if(dataObj) {
    console.log(dataObj.styles);
    return (
      <div>

      </div>
    );
  }
  return null;
}
export default Styles;
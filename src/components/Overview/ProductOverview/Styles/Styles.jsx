import React from 'react';
import { useState } from 'react';

const Styles = ({ dataObj }) => {
  const [styles, setStyles] = useState(dataObj.styles);
  if (styles) {
    // console.log(dataObj.styles);
    return <div></div>;
  }
  return null;
};
export default Styles;

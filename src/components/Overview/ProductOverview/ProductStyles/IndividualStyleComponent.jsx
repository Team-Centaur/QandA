import React from 'react';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const IndividualStyleComponent = ({style, onStyleHandler, isSelected}) => {
const thumbnailPhoto = style.photos[0].thumbnail_url;


  if(style) {
    return (
      <div data-testid ="individual-style-component" className={isSelected === style? 'style-selected': 'normal'} onClick={(e) => onStyleHandler(style)}>
        {isSelected === style &&  <AiFillCheckCircle className= "checkmark-icon"/> }
        <img
          src = {thumbnailPhoto}
          className = {isSelected === style? 'img-selected':"thumbnail-img"}
        />
      </div>
    )
  }
  return null;
}
export default IndividualStyleComponent;

{/* <div onClick={onClose} style={modalStyle}>
<img
  src={photo}
  alt='review image'
  width='100%'
  max-width='80vw'
  height='100%'
  max-height='80vh'
/>
</div> */}
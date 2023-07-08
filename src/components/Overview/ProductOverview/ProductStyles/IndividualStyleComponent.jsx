import React from 'react';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const IndividualStyleComponent = ({style, onStyleHandler, isSelected,styleName}) => {
const thumbnailPhoto = style.photos[0].thumbnail_url;


  if(style) {
    return (
      <div data-testid ="individual-style-component" className={isSelected === style? 'style-selected': 'normal'} onClick={(e) => onStyleHandler(style)}>
        {isSelected === style &&  <AiFillCheckCircle className= "checkmark-icon"/> }
        <img
          src = {thumbnailPhoto}
          className = {isSelected === style? 'img-selected':"thumbnail-img"}
          alt = {styleName}
        />
      </div>
    )
  }
  return null;
}
export default IndividualStyleComponent;

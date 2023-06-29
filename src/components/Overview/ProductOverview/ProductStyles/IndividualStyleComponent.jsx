import React from 'react';
import { useState } from 'react';

const IndividualStyleComponent = ({style, onStyleHandler}) => {
  const thumbnailPhoto = style.photos[0].thumbnail_url;
  console.log('Render IndividualStyle')
  if(style) {
    return (
      <div className="individual-style" onClick={(e) => onStyleHandler(style)}>
        <img
          src = {thumbnailPhoto}
          className = "thumbnail-img"
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
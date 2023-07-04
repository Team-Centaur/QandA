import React, {useEffect, useState, forwardRef} from 'react';

const ThumbNailImage =forwardRef(function ThumbNailImage({image, onThumbnailImageHandler, isSelected}, ref) {
  if(image) {
    return (
      <li ref= {ref} onClick={(e) =>onThumbnailImageHandler(image) } className={isSelected ===image? "selected": "individual-thumbnail-image-container"}>
        <img
        className="individual-thumbnail-image"
         src = {image}
        />
      </li>
    )
  }
  return null;
})

export default ThumbNailImage;
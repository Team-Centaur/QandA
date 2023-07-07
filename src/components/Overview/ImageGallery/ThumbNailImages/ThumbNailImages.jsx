import React, {useEffect, useState, forwardRef} from 'react';

const ThumbNailImage =forwardRef(function ThumbNailImage({image, onThumbnailImageHandler, isSelected}, ref) {
  if(image) {
    return (
      <li data-testid="thumbnail-list" ref= {ref} onClick={(e) =>onThumbnailImageHandler(image) } className={isSelected ===image? "selected": "individual-thumbnail-image-container"}>
        <img
        data-testid = 'thumbnail-image'
        className="individual-thumbnail-image"
         src = {image}
         loading = "lazy"
        />
      </li>
    )
  }
  return null;
})

export default ThumbNailImage;
import React, {useEffect, useState} from 'react';

const ThumbNailImage =({image, onThumbnailImageHandler, isSelected}) => {
  if(image) {
    return (
      <div onClick={(e) =>onThumbnailImageHandler(image) } className={isSelected ===image? "selected": "individual-thumbnail-image-container"}>
        <img
        className="individual-thumbnail-image"
         src = {image}
        />
      </div>
    )
  }
  return null;
}

export default ThumbNailImage;
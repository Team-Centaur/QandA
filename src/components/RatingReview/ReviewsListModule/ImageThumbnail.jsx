import React from 'react';

const ImageThumbnail = ({ photo }) => (

  <div>
    <img src={photo.url} alt='review thumbnail' />
    {/* RESIZE THIS IMAGE */}
  </div>
);

export default ImageThumbnail;

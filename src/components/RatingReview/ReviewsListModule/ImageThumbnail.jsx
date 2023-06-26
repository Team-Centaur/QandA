import React from 'react';
import './ImageThumbnail.css';

const ImageThumbnail = ({ photo }) => {
  // <img src={photo.url} alt='review thumbnail' width='100'/>
  // thumbnailStyle.backgroundImage = (photo.url);
  const thumbnailStyle = {
    width: '65px',
    height: '50px',
    backgroundColor: 'blue',
    backgroundImage: 'url(' + photo.url + ')',
    backgroundSize: 'cover',
    display: 'inline-block',
    margin: '5px'
  };

  return <div style={thumbnailStyle} />;
};

export default ImageThumbnail;

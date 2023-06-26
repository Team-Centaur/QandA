import React from 'react';
import './ImageThumbnail.css';

const ImageThumbnail = ({ photo }) => (
  <img src={photo.url} alt='review thumbnail' width='100'/>
);

export default ImageThumbnail;

import React from 'react';

const PhotoUpload = () => {

  return (
    <>
      <h4>Upload photos</h4>
      <input type='file' className='reviewPhoto' accept='image/*'></input>
    </>
  );
}

export default PhotoUpload;
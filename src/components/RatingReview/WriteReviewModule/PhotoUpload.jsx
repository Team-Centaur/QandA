import React, { useState } from 'react';

const PhotoUpload = () => {
  const [uploadInputVisibility, setUploadInputVisibility] = useState([1]);
  const onLoad = (e) => {
    if (uploadInputVisibility.length < 5) {
      setUploadInputVisibility([...uploadInputVisibility, 1])
    }
  }

  return (
    <>
      <h4>Upload photos</h4>
      {uploadInputVisibility.map((uploadInput, index) => {
         return (
            <div key={index}>
              <input
                type='file'
                className='reviewPhoto'
                accept='image/*'
                onChange={onLoad}
              >
              </input>
            </div>
          )
      })}

    </>
  );
}

export default PhotoUpload;
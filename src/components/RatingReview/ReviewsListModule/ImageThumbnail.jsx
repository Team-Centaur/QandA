import React, { useState } from 'react';
import ReviewImageModal from './ReviewImageModal.jsx';

const ImageThumbnail = ({ photo }) => {
  const [openModal, setOpenModal] = useState(false);

  const thumbnailStyle = {
    width: '65px',
    height: '50px',
    backgroundColor: 'Gainsboro',
    backgroundImage: 'url(' + photo.url + ')',
    backgroundSize: 'cover',
    display: 'inline-block',
    margin: '5px'
  };

  return (
    <>
      <div style={thumbnailStyle} onClick={() => setOpenModal(true)}>
        {/* added a transparent img element so that thumbnails are still recognised by screen readers */}
        <img src={photo.url} alt='review image thumbnail' style={{opacity: '0', height: '100%'}}></img>
      </div>
      {openModal && <ReviewImageModal onClose={() => setOpenModal(false)} photo={photo.url} />}
    </>
  );
};

export default ImageThumbnail;

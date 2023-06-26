import React from 'react';

const ReviewImageModal = ({ onClose, photo }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '10px',
    zIndex: 1000
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div onClick={onClose} style={modalStyle}>
        <img
          src={photo}
          alt='review image'
          width='100%'
          max-width='80vw' // 80% of viewport
          height='100%'
          max-height='80vh' // 80% of viewport
        />
      </div>
    </>
  )
}

export default ReviewImageModal;

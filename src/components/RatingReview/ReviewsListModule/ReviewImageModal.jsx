import React from 'react';
import ReactDom from 'react-dom';

const ReviewImageModal = ({ onClose, photo }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '10px',
    zIndex: 2001
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  };

  return ReactDom.createPortal(
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div onClick={onClose} style={modalStyle}>
        <img
          src={photo}
          alt='review image'
          width='100%'
          max-width='80vw'
          height='100%'
          max-height='80vh'
        />
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ReviewImageModal;

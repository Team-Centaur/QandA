import React from 'react';
import ReactDom from 'react-dom';
// import './ReviewImageModal.css';

const ReviewImageModal = ({ onClose, photo }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    maxHeight:'90vh',
    maxWidth:'90vw',
    padding: '10px',
    zIndex: 2001,
    overflowY: 'auto'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2001
  };

  return ReactDom.createPortal(
    <>
      <div onClick={onClose} className='reviewModalOverlay' />
      <div onClick={onClose}  className='reviewImageModal' >
        <img
          src={photo}
          alt='review image'
          width='100%'
          height='100%'
        />
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ReviewImageModal;

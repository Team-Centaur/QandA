import React from 'react';
import ReactDom from 'react-dom';
// import './ReviewImageModal.css';
import '../..//QuesAnswer/ImageModal.css';

const ReviewImageModal = ({ onClose, photo }) => {

  return ReactDom.createPortal(
    <>
      <div onClick={onClose} className='overlay' />
      <div onClick={onClose}  className='imageModal' >
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

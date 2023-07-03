import React from 'react';
import ReactDom from 'react-dom';
import './ImageModal.css';

const ImageModal = ({isImageModal, setImageModal, photo}) => {

  const closeOnClickHandler = () => {
    setImageModal(false);
    document.body.style.overflow = 'auto';
  };

  return isImageModal && ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="imageModal">
        <button className="imageClose" onClick={closeOnClickHandler}>X</button>
        <img src={photo.url} />
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default ImageModal;
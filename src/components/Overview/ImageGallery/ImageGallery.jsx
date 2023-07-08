import React, { useState, useEffect, useRef, useContext } from 'react';
import ThumbNailImage from './ThumbNailImages/ThumbNailImages.jsx';
import { dummyData } from './dummyData.js';
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import { BsFullscreen } from 'react-icons/bs';
import CurrContext from '../../../store/curr-item-context.jsx';
import './imageGallery.css';

const ImageGallery = ({
  expandedView,
  onExpandedViewHandler,
  currStyles,
  currentStyle,
}) => {
  const [thumbNailImages, setThumbNailImages] = useState(null);
  const [mainImages, setMainImages] = useState(null);
  const [currMainImage, setCurrMainImage] = useState(null);
  const [isSelected, setIsSelected] = useState(null);
  const thumbNailContainer = useRef(null);
  const thumbNailImagesRef = useRef([]);
  const [styleName, setStyleName] = useState(null);
  const [stylesIdArray, setStylesIdArray] = useState(null);
  const [currIndex, setCurrIndex] = useState(0);
  const currCtx = useContext(CurrContext);
  ///////********USE EFFECT*****/////////



  useEffect(()=> {
    if(currStyles) {
      // find the index of current style
      const idArray = currStyles.results.map((style) => {
        return style.style_id;
      });
      setStylesIdArray(idArray);
      const index = idArray.indexOf(currentStyle.style_id);
      const { photos } = currStyles.results[index];
      const urls = photos.map((photo) => {
        return photo.url;
      });
      const thumbnailUrls = photos.map((photo) => {
        return photo.thumbnail_url;
      });
      setThumbNailImages(thumbnailUrls);
      setStyleName(name);
      setMainImages(urls);
      setCurrMainImage(urls[0]);
      setIsSelected(thumbnailUrls[0]);
      setCurrIndex(0);
    }
  }, [currStyles, currentStyle]);

  //////////****FUNCTION HANDLERS***/////////
  const onThumbnailImageHandler = (image) => {
    const selectedIndex = thumbNailImages.indexOf(image);
    setCurrMainImage(mainImages[selectedIndex]);
    setIsSelected(image);
    setCurrIndex(selectedIndex);
  };

  const onUpClickHandler = () => {
    const amountToScrollBy = thumbNailContainer.current.scrollTop - 80;
    thumbNailContainer.current.scrollTo({
      top: amountToScrollBy,
      behavior: 'smooth',
    });
  };

  const onDownClickHandler = () => {
    const amountToScrollBy = thumbNailContainer.current.scrollTop + 80;
    // scrollTop give the distance between top of container to current position
    thumbNailContainer.current.scrollTo({
      top: amountToScrollBy,
      behavior: 'smooth',
    });
  };
  const onLeftArrowHandler = () => {
    if (currIndex > 0) {
      const index = currIndex - 1;
      const currThumbnailImage = thumbNailImages[index];
      const currentMainImage = mainImages[index];
      const currRef = thumbNailImagesRef.current[index];
      const container = thumbNailContainer.current;
      if (container && container.scrollTo) {
        const distanceFromParent = currRef.offsetTop; // GIVES THE DISTANCE FROM TOP OF PARENT CONTAINER
        const containerPreviousPosition = thumbNailContainer.current.scrollTop;
        let scrollPosition = containerPreviousPosition - 40.090909004211426;
        if (scrollPosition < 0) {
          scrollPosition = 0;
        }
        thumbNailContainer.current.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
      setCurrMainImage(currentMainImage);
      setIsSelected(currThumbnailImage);
      setCurrIndex(index);
    }
  };
  const onRightArrowHandler = () => {
    if (currIndex < thumbNailImages.length - 1) {
      const index = currIndex + 1;
      const currThumbnailImage = thumbNailImages[index];
      const currentMainImage = mainImages[index];
      const currRef = thumbNailImagesRef.current[index];
      const container = thumbNailContainer.current;
      if (container && container.scrollTo) {
        const containerPreviousPosition = thumbNailContainer.current.scrollTop;
        let scrollPosition = containerPreviousPosition + 40.090909004211426;
        const scrollHeight =
          thumbNailContainer.current.scrollHeight -
          (thumbNailContainer.current.clientHeight - 20);
        // scrollHeight gives height of items in div together, clientHeight only gives heigh of visible including padding.
        scrollPosition =
          scrollPosition > scrollHeight ? scrollHeight : scrollPosition;
        thumbNailContainer.current.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        });
      }
      setCurrMainImage(currentMainImage);
      setIsSelected(currThumbnailImage);
      setCurrIndex(index);
    }
  };

  ////////*****RENDERING*****/////////
  if (thumbNailImages && currMainImage) {
    return (
      <>
        <div
          data-testid="image-gallery-container"
          className={
            expandedView
              ? `expanded-view ${currCtx.currTheme}`
              : `image-gallery-container ${currCtx.currTheme} `
          }
        >
          <div
            className={
              expandedView
                ? 'expanded-arrows-plus-container'
                : 'arrows-plus-thumbnails'
            }
          >
            {thumbNailImages.length >= 7 && (
              <AiOutlineArrowUp
                data-testid="up-arrow"
                onClick={onUpClickHandler}
              />
            )}

            <ul
              data-testid="thumbnail-container"
              className="thumbnail-images-container"
              ref={thumbNailContainer}
            >
              {thumbNailImages.map((image, index) => {
                return (
                  <ThumbNailImage
                    onThumbnailImageHandler={onThumbnailImageHandler}
                    image={image}
                    isSelected={isSelected}
                    key={`${image}-${index}`}
                    ref={(el) => (thumbNailImagesRef.current[index] = el)}
                  />
                );
              })}
            </ul>
            {thumbNailImages.length >= 7 && (
              <AiOutlineArrowDown
                data-testid="down-arrow"
                onClick={onDownClickHandler}
              />
            )}
          </div>
          <div className="main-image-container" >
            <AiOutlineArrowLeft data-testid ="left-arrow" className ="left-arrow"  onClick ={onLeftArrowHandler}  />
            {currMainImage && isMainImageLoaded && (
              <img
                data-testid="main-image"
                src={currMainImage}
                className={expandedView ? "expanded-main-image" : "main-image"}
              />
            )}
            <AiOutlineArrowRight data-testid ="right-arrow" className= "right-arrow" onClick = {onRightArrowHandler}/>
          </div>
          <BsFullscreen
            data-testid="fullscreen-icon"
            onClick={onExpandedViewHandler}
            className="fullscreen-icon"
          />
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default ImageGallery;

{
  /* <img data-testid = "main-image" src ={currMainImage} className={expandedView? "expanded-main-image":"main-image"} loading ="lazy" /> */
}

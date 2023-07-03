import React, {useState, useEffect, useRef} from 'react';
import ThumbNailImage from './ThumbNailImages/ThumbNailImages.jsx';
import {dummyData} from './dummyData.js';
import {AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai';
import './imageGallery.css'

    const dummyImages = dummyData.results.map(({photos}) => {
        const obj = photos[0]; // as the object of images
        const{url} = obj;
        return url;
      })

const ImageGallery = ({currItem, currStyles, currentStyle, setCurrentStyle}) => {
  const [thumbNailImages, setThumbNailImages] = useState(null);
  const [currMainImage, setCurrMainImage] = useState(null);
  const [isSelected, setIsSelected] = useState(null);
  const thumbNailContainer = useRef(null);
  const thumbNailImagesRef = useRef([]);
  const [currIndex, setCurrIndex] = useState(0);

 ///////********USE EFFECT*****/////////
  useEffect(()=> {
    if(currStyles) {

      const images = currStyles.results.map(({photos}) => {
        const obj = photos[0]; // as the object of images
        const{url} = obj;
        return url;
      })
      setThumbNailImages(images);
    }
  }, [currStyles])

  useEffect(() => {
    setCurrMainImage(currentStyle.photos[0].url);
    setIsSelected(currentStyle.photos[0].url);
  }, [currentStyle])
  //////////****FUNCTION HANDLERS***/////////
  const onThumbnailImageHandler = (image) =>{
    setCurrMainImage(image);
    setIsSelected(image);
    const selectedIndex = thumbNailImages.indexOf(image);
    setCurrIndex(selectedIndex)
  }

  useEffect (() => {

  }, [currIndex])
  const onUpClickHandler = () => {
    const amountToScrollBy= thumbNailContainer.current.scrollTop - 80;
    thumbNailContainer.current.scrollTo({
      top: amountToScrollBy,
      behavior: 'smooth'
    })
  }

  const onDownClickHandler = () => {
    const amountToScrollBy = thumbNailContainer.current.scrollTop + 80;
    // scrollTop give the distance between top of container to current position
    thumbNailContainer.current.scrollTo({
      top: amountToScrollBy,
      behavior: 'smooth'
    })
  }
  const onLeftArrowHandler = () => {
    if(currIndex >0) {
      const index = currIndex-1;
      const currImage = thumbNailImages[index];
      const currRef = thumbNailImagesRef.current[index];
      const distanceFromParent = currRef.offsetTop; // GIVES THE DISTANCE FROM TOP OF PARENT CONTAINER
      const containerPreviousPosition = thumbNailContainer.current.scrollTop;
      let scrollPosition = containerPreviousPosition - 14.090909004211426;
      if(scrollPosition < 0) {
        scrollPosition = 0;
      }
      thumbNailContainer.current.scrollTo({
        top:scrollPosition,
        behavior:'smooth'
      })
      setCurrMainImage(currImage);
      setIsSelected(currImage);
      setCurrIndex(index);
    }
  }
  const  onRightArrowHandler = () => {
    if(currIndex < thumbNailImages.length-1) {
      const index = currIndex+1;
      const currImage = thumbNailImages[index];
      const currRef = thumbNailImagesRef.current[index];
      const containerPreviousPosition = thumbNailContainer.current.scrollTop;
      let scrollPosition = containerPreviousPosition + 14.090909004211426;
      const scrollHeight = thumbNailContainer.current.scrollHeight - thumbNailContainer.current.clientHeight;
      // scrollHeight gives height of items in div together, clientHeight only gives heigh of visible including padding.
      scrollPosition = (scrollPosition> scrollHeight) ? scrollHeight: scrollPosition;
      thumbNailContainer.current.scrollTo({
        top:scrollPosition,
        behavior:'smooth'
      })
      setCurrMainImage(currImage);
      setIsSelected(currImage);
      setCurrIndex(index);
    }

  }
 ////////*****RENDERING*****/////////
  if(thumbNailImages && currMainImage) {

    return (
      <div className="image-gallery-container" >
        <div className = "arrows-plus-thumbnails">
          {thumbNailImages.length >=7 && <AiOutlineArrowUp onClick = {onUpClickHandler} /> }

          <div className="thumbnail-images-container" ref = {thumbNailContainer}>
            {thumbNailImages.map((image, index) => {
              return(
                <ThumbNailImage
                  onThumbnailImageHandler ={onThumbnailImageHandler}
                  image ={image}
                  isSelected={isSelected}
                  key = {`${image}-${index}`}
                  ref = {(el) => (thumbNailImagesRef.current[index] = el)}
                />
                )
            })}
          </div>
          {thumbNailImages.length >=7 &&<AiOutlineArrowDown onClick = {onDownClickHandler}/>}
        </div>
        <div className="main-image-container" >
          <AiOutlineArrowLeft onClick ={onLeftArrowHandler}  />
          <img src ={currMainImage} className="main-image" />
          <AiOutlineArrowRight onClick = {onRightArrowHandler}/>
        </div>

      </div>
    )

  } else {
    return null;
  }
}
export default ImageGallery;


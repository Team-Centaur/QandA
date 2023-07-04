import React, {useState, useEffect, useRef} from 'react';
import ThumbNailImage from './ThumbNailImages/ThumbNailImages.jsx';
import {dummyData} from './dummyData.js';
import {AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineArrowRight, AiOutlineArrowLeft} from 'react-icons/ai';
import { BsFullscreen } from 'react-icons/bs'
import './imageGallery.css'


    const dummyImages = dummyData.results.map(({photos}) => {
        const obj = photos[0]; // as the object of images
        const{url} = obj;
        return url;
      })

const ImageGallery = ({expandedView, onExpandedViewHandler, currItem, currStyles, currentStyle, setCurrentStyle}) => {
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
    if(thumbNailImages) {
      console.log('here');
      const index = thumbNailImages.indexOf(currentStyle.photos[0].url);
      console.log(index);
      setCurrIndex(index);
    }
  }, [currentStyle])
  //////////****FUNCTION HANDLERS***/////////
  const onThumbnailImageHandler = (image) =>{
    setCurrMainImage(image);
    setIsSelected(image);
    const selectedIndex = thumbNailImages.indexOf(image);
    setCurrIndex(selectedIndex)
  }


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
      console.log(currIndex);
      const index = currIndex-1;
      const currImage = thumbNailImages[index];
      const currRef = thumbNailImagesRef.current[index];
      const distanceFromParent = currRef.offsetTop; // GIVES THE DISTANCE FROM TOP OF PARENT CONTAINER
      const containerPreviousPosition = thumbNailContainer.current.scrollTop;
      console.log('containerPreviousPosition', containerPreviousPosition);
      let scrollPosition = containerPreviousPosition - 40.090909004211426;
      console.log('scrollPosition', scrollPosition);
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
      console.log(currIndex);
      const index = currIndex+1;
      const currImage = thumbNailImages[index];
      const currRef = thumbNailImagesRef.current[index];
      const containerPreviousPosition = thumbNailContainer.current.scrollTop;
      let scrollPosition = containerPreviousPosition + 40.090909004211426;
      const scrollHeight = thumbNailContainer.current.scrollHeight - (thumbNailContainer.current.clientHeight - 20);
      console.log('CLIENT HEIGHT', thumbNailContainer.current.clientHeight);
      console.log('Actual SCROLL HEIGHT', thumbNailContainer.current.scrollHeight );
      console.log('scroll height', scrollHeight);
      console.log('PRE', scrollPosition);
      // scrollHeight gives height of items in div together, clientHeight only gives heigh of visible including padding.
      scrollPosition = (scrollPosition> scrollHeight) ? scrollHeight: scrollPosition;
      console.log('scroll position', scrollPosition)
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
    console.log(expandedView);
    return (
      <>
        <div className={expandedView? "expanded-view" :"image-gallery-container"} >
          <div className ={expandedView? "expanded-arrows-plus-container": "arrows-plus-thumbnails"}>
            {thumbNailImages.length >=7 && <AiOutlineArrowUp onClick = {onUpClickHandler} /> }

            <ul className="thumbnail-images-container" ref = {thumbNailContainer}>
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
            </ul>
            {thumbNailImages.length >=7 &&<AiOutlineArrowDown onClick = {onDownClickHandler}/>}
          </div>
          <div className="main-image-container" >
            <AiOutlineArrowLeft className ="left-arrow"  onClick ={onLeftArrowHandler}  />
            <img src ={currMainImage} className={expandedView? "expanded-main-image":"main-image"} />
            <AiOutlineArrowRight className= "right-arrow" onClick = {onRightArrowHandler}/>
          </div>
          <BsFullscreen onClick={onExpandedViewHandler} className = "fullscreen-icon"/>
        </div>
      </>
    )

  } else {
    return null;
  }
}
export default ImageGallery;


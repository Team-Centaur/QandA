import React, {useState, useEffect, useRef} from 'react';
import ThumbNailImage from './ThumbNailImages/ThumbNailImages.jsx';
import {dummyData} from './dummyData.js';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai';
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
  // Main img is diff from thumbnail imgs



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

  const onThumbnailImageHandler = (image) =>{
    setCurrMainImage(image);
    setIsSelected(image);
  }
  if(thumbNailImages && currMainImage) {

    return (
      <div className="image-gallery-container" >
        <div className = "arrows-plus-thumbnails">
          {thumbNailImages.length >=7 && <AiOutlineArrowUp onClick = {onUpClickHandler} /> }

          <div className="thumbnail-images-container" ref = {thumbNailContainer}>
            {thumbNailImages.map((image, index) => {
              console.log('Key', `${image}-${index}`)
              return(
                <ThumbNailImage
                  onThumbnailImageHandler ={onThumbnailImageHandler}
                  image ={image}
                  isSelected={isSelected}
                  key = {`${image}-${index}`}
                />
                )
            })}
          </div>
          {thumbNailImages.length >=7 &&<AiOutlineArrowDown onClick = {onDownClickHandler}/>}
        </div>
        <div className="main-image-container" >
          <img src ={currMainImage} className="main-image" />
        </div>

      </div>
    )

  } else {
    return null;
  }
}
export default ImageGallery;


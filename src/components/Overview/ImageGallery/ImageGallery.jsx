import React, {useState, useEffect} from 'react';
import ThumbNailImage from './ThumbNailImages/ThumbNailImages.jsx';
import {dummyData} from './dummyData.js';
import './imageGallery.css'

    const dummyImages = dummyData.results.map(({photos}) => {
        const obj = photos[0]; // as the object of images
        const{url} = obj;
        return url;
      })


const ImageGallery = ({currItem, currStyles, currentStyle, setCurrentStyle}) => {
  const [thumbNailImages, setThumbNailImages] = useState(dummyImages);
  const [currMainImage, setCurrMainImage] = useState(null);
  const [isSelected, setIsSelected] = useState(null)
  // Main img is diff from thumbnail imgs



  // // useEffect(()=> {
  // //   if(currStyles) {
  // //     console.log(currStyles);

  // //     const images = currStyles.results.map(({photos}) => {
  // //       const obj = photos[0]; // as the object of images
  // //       const{url} = obj;
  // //       return url;
  // //     })
  // //     setThumbNailImages(images);
  // //   }
  // // }, [currStyles])

  useEffect(() => {
    console.log('MAIN IMAGE', currentStyle.photos[0].url)
    setCurrMainImage(currentStyle.photos[0].url);
    setIsSelected(currentStyle.photos[0].url);
  }, [currentStyle])

  const onThumbnailImageHandler = (image) =>{
    setCurrMainImage(image);
    setIsSelected(image);
  }
  if(thumbNailImages && currMainImage) {
    console.log('STATE', currMainImage);
    return (
      <div className="image-gallery-container" >
        <div className="thumbnail-images-container">
          {thumbNailImages.map((image) => {
            return(
              <ThumbNailImage
                onThumbnailImageHandler ={onThumbnailImageHandler}
                image ={image}
                isSelected={isSelected}
              />
              )
          })}
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


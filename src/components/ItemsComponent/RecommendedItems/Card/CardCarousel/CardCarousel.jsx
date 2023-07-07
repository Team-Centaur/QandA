import React from 'react';
import Image from './Image.jsx';
import { v4 } from 'uuid';

const CardCarousel = ({
  productStyles,
  mouseHover,
  setAlternativeStyle,
  setProductObj,
}) => {
  const productImageElements = productStyles
    .map((style) => style.photos[0].thumbnail_url)
    .map((imageUrl) => (
      <Image
        key={v4()}
        imageUrl={imageUrl}
        setAlternativeStyle={setAlternativeStyle}
        setProductObj={setProductObj}
      />
    ));

  return (
    <aside
      className="items--card_carousel-container"
      style={{ position: 'absolute', bottom: mouseHover ? '' : '-3rem' }}
    >
      <ul>{productImageElements}</ul>
    </aside>
  );
};

export default CardCarousel;

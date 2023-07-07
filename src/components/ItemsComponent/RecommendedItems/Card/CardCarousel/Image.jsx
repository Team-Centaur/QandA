import React, { useState } from 'react';

const Image = ({ imageUrl, setAlternativeStyle, setProductObj }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [altImageClicked, setAltImageClicked] = useState(false);
  const handleMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMouseIsOver(true);
    setAlternativeStyle(imageUrl);
  };

  const handleMouseLeave = (e) => {
    setMouseIsOver(false);

    !altImageClicked && setAlternativeStyle(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setAltImageClicked(true);
    setAlternativeStyle(imageUrl);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="items--card_carousel-img"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '3rem',
        width: '3rem',
      }}
    />
  );
};

export default Image;

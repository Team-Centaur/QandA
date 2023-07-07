import React from 'react';

const Image = ({ imageUrl }) => {
  return (
    <li
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

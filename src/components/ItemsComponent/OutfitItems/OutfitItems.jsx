import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Card from './Card/Card.jsx';

import './OutfitItems.css';

const OutfitItems = ({ currItem, currStyles, currAvgRating }) => {
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [savedItemsId, setSavedItemsId] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reachMaxScroll, setReachMaxScroll] = useState(false);
  const [fullProds, setFullProds] = useState([]);
  // Load localStorage
  useEffect(() => {
    const retreivedOutfit = JSON.parse(localStorage.getItem('outfit'));
    if (!retreivedOutfit) {
      return;
    }
    if (retreivedOutfit.length > 0) {
      setFullProds(retreivedOutfit);
    }
  }, []);

  // Set savedItemsId to localStorage
  useEffect(() => {
    localStorage.setItem('outfit', JSON.stringify(fullProds));
  }, [fullProds]);

  ////////////////////////////////////////////
  ////////////// CAROUSEL LOGIC //////////////
  ////////////////////////////////////////////
  const outfitListRef = useRef(null);
  /// helper functions
  const hasReachedMaxScroll = () =>
    scrollPosition + outfitListRef.current.clientWidth + 100 >=
    outfitListRef.current.scrollWidth;

  const scrollTo = (position) => {
    outfitListRef.current.scrollTo({
      left: position,
      behavior: 'smooth',
    });
  };

  //// Main functions
  const scrollRight = () => {
    // Check to see if max scroll
    if (hasReachedMaxScroll()) {
      setReachMaxScroll(true);
      return;
    }
    const newScrollPosition = scrollPosition + 220;
    setScrollPosition(newScrollPosition);

    // Scroll the list to the new position.
    if (outfitListRef.current) {
      scrollTo(newScrollPosition);
    }
  };

  const scrollLeft = () => {
    const newScrollPosition = scrollPosition - 220;
    setScrollPosition(newScrollPosition);
    if (outfitListRef.current) {
      scrollTo(newScrollPosition);
    }
  };

  ///Check to see if at end of carousel, move to beginning if less than 2 items
  useEffect(() => {
    const maxScrollReached = hasReachedMaxScroll();
    setReachMaxScroll(maxScrollReached);
    if (fullProds.length <= 2) setScrollPosition(0);
  }, [scrollPosition, fullProds]);

  ////////////// ADD OUTFIT HANDLER //////////////
  const handleAddItem = () => {
    const cantAdd = fullProds.some((product) => {
      console.log(product.id, currItem.id);
      return product.id == currItem.id;
    });
    console.log(cantAdd);
    if (cantAdd) {
      return;
    }
    setFullProds((prevState) => [
      {
        id: currItem.id,
        product: currItem,
        styles: currStyles,
        rating: currAvgRating,
      },
      ...prevState,
    ]);
  };
  console.error('ERRRRR!!!!!!!!!!!!!!!', fullProds, currStyles, currItem);

  ////////////// RENDER ELEMENTS //////////////
  const renderAddItemButton = () => (
    <button className="items-comp--outfit-add_btn" onClick={handleAddItem}>
      Add Item +
    </button>
  );

  const renderCards = () =>
    fullProds.map((productData) => (
      <Card
        productData={productData}
        key={productData.id}
        fullProds={fullProds}
        setFullProds={setFullProds}
      />
    ));

  const renderLeftArrow = () =>
    scrollPosition > 0 && (
      <button
        className="items-comp--outfit-list_btn left"
        type="button"
        onClick={scrollLeft}
      >
        <FaArrowLeft size="1rem" />
      </button>
    );

  const renderRightArrow = () =>
    !reachMaxScroll &&
    fullProds.length > 2 && (
      <button
        className="items-comp--outfit-list_btn right"
        type="button"
        onClick={scrollRight}
      >
        <FaArrowRight size="1rem" />
      </button>
    );

  ////////////// JSX //////////////
  if (fullProds.length === 0) {
    return (
      <>
        <h3 className="items-comp--outfit-heading">Outfit</h3>
        <div className="items-comp--outfit-container">
          <ul className="items-comp--outfit-list" ref={outfitListRef}>
            {renderAddItemButton()}
          </ul>
        </div>
      </>
    );
  }
  return (
    <>
      <h3 className="items-comp--outfit-heading">Outfit</h3>
      <div
        className={`items-comp--outfit-container ${
          fullProds.length > 2 ? 'fade' : ''
        }`}
      >
        {renderLeftArrow()}
        <ul className="items-comp--outfit-list" ref={outfitListRef}>
          {renderAddItemButton()}
          {renderCards()}
        </ul>
        {renderRightArrow()}
      </div>
    </>
  );
};

export default OutfitItems;

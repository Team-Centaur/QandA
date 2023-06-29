import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import Card from './Card/Card.jsx';

import './OutfitItems.css';

import getRelatedItemsByID from '../../../helperFunctions/App/getRelatedItemsById.js';

const OutfitItems = ({ currItem }) => {
  const [savedItemsId, setSavedItemsId] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reachMaxScroll, setReachMaxScroll] = useState(false);

  // Load localStorage
  useEffect(() => {
    const retreivedIds = JSON.parse(localStorage.getItem('outfit'));
    if (retreivedIds.length > 0) {
      setSavedItemsId(retreivedIds);
    }
  }, []);

  // Set savedItemsId to localStorage
  useEffect(() => {
    localStorage.setItem('outfit', JSON.stringify(savedItemsId));
  }, [savedItemsId]);

  useEffect(() => {
    if (
      outfitListRef.current &&
      scrollPosition + outfitListRef.current.clientWidth + 100 >=
        outfitListRef.current.scrollWidth &&
      savedItemsId.length > 2
    ) {
      setReachMaxScroll(true);
    } else {
      setReachMaxScroll(false);
    }
  }, [scrollPosition, savedItemsId]);

  /// /////////// CAROUSEL LOGIC //////////////
  const outfitListRef = useRef(null);
  // const reachedMaxScrollWidth =
  //   scrollPosition + outfitListRef.current.clientWidth >= outfitListRef.current.scrollWidth;

  const scrollRight = () => {
    // Check to see if max scroll
    if (
      scrollPosition + outfitListRef.current.clientWidth + 100 >=
      outfitListRef.current.scrollWidth
    ) {
      setReachMaxScroll(true);
      return;
    }

    const newScrollPosition = scrollPosition + 220;
    setScrollPosition(newScrollPosition);

    // Scroll the list to the new position.
    if (outfitListRef.current) {
      outfitListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    const newScrollPosition = scrollPosition - 220;
    setScrollPosition(newScrollPosition);
    if (outfitListRef.current) {
      outfitListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };
  // Reset scroll position when currItem changes

  /// /////////// PAGE RENDERING USEEFFECT //////////////
  // When an id is added to savedItemsIds we need to rerender the page and
  // make calls to the DB to get info on the item

  /// /////////// ADD OUTFIT HANDLER //////////////
  const handleAddItem = () => {
    const cantAdd = savedItemsId.some((id) => id === currItem.id);
    if (cantAdd) {
      return;
    }
    setSavedItemsId((prevState) => [currItem.id, ...prevState]);
  };
  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (savedItemsId.length === 0) {
    return (
      <div className="items-comp--outfit-container">
        <ul className="items-comp--outfit-list" ref={outfitListRef}>
          <button
            className="items-comp--outfit-add_btn"
            onClick={handleAddItem}
          >
            Add This Item +
          </button>
        </ul>
      </div>
    );
  }

  /// /////////// DISPLAY ELEMENTS CREATION //////////////

  const cards = savedItemsId.map((product) => (
    <Card
      productID={product}
      key={product}
      savedItemsId={savedItemsId}
      setSavedItemsId={setSavedItemsId}
    />
  ));

  // /////////// JSX //////////////
  return (
    <div
      className={`items-comp--outfit-container ${
        savedItemsId.length > 2 ? 'fade' : ''
      }`}
    >
      {scrollPosition > 0 && (
        <button
          className="items-comp--outfit-list_btn left"
          type="button"
          onClick={scrollLeft}
        >
          <FaArrowLeft size="1rem" />
        </button>
      )}

      <ul
        className="items-comp--outfit-list"
        // style={{ width: `${listWidth}%` }}
        ref={outfitListRef}
      >
        <button className="items-comp--outfit-add_btn" onClick={handleAddItem}>
          Add Item +
        </button>
        {cards}
      </ul>
      {!reachMaxScroll && savedItemsId.length > 2 && (
        <button
          className="items-comp--outfit-list_btn right"
          type="button"
          onClick={scrollRight}
        >
          <FaArrowRight size="1rem" />
        </button>
      )}
    </div>
  );
};

export default OutfitItems;

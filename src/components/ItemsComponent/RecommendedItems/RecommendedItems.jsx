import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Card from '../Card/Card.jsx';

import './RecommendedItems.css';

import getRelatedItemsByID from '../../../helperFunctions/getRelatedItemsByID.js';
// import getProductById from '../../../helperFunctions/App/getProductById.js';

const RecommendedItems = ({ currItem, setCurrItem }) => {
  const [relatedItems, setRelatedItems] = useState(null);

  /// /////////// USE EFFECTS //////////////
  useEffect(() => {
    // Reset relateted items each time currItem is changed
    setRelatedItems(null);
    getRelatedItemsByID(currItem.id)
      .then((data) => {
        setRelatedItems(data);
      })
      .catch((err) => {
        console.error(`There was an error: ${err}`);
      });
  }, [currItem]);

  /// /////////// CONDITIONAL RENDERING & LOADING STATE //////////////
  if (!relatedItems) {
    return <p style={{ fontSize: '2rem' }}>Loading...</p>;
  }

  if (!relatedItems || !Array.isArray(relatedItems)) {
    return (
      <div className="items-comp--reco_container">
        There are no related Products
      </div>
    );
  }

  /// /////////// DISPLAY ELEMENTS CREATION //////////////
  const cards = relatedItems.map((product) => (
    <Card productID={product} key={product} setCurrItem={setCurrItem} />
  ));
  let listWidth = 100;

  /// /////////// STYLES //////////////
  if (relatedItems.length > 3) {
    listWidth += (relatedItems.length - 3) * 30;
  }

  // /////////// JSX //////////////
  return (
    <div
      className={`items-comp--reco-container ${
        relatedItems.length > 3 ? 'fade' : ''
      }`}
    >
      <ul className="items-comp--reco-list" style={{ width: `${listWidth}%` }}>
        {cards}
      </ul>
      {relatedItems.length > 4 && (
        <button className="items-comp--reco-list_btn right" type="button">
          <FaArrowRight size="1rem" />
        </button>
      )}
    </div>
  );
};

export default RecommendedItems;

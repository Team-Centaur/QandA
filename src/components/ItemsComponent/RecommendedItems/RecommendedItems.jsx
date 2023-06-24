import React, { useEffect, useState } from 'react';
import Card from '../Card/Card.jsx';

import './RecommendedItems.css';

import getRelatedItemsByID from '../../../helperFunctions/getRelatedItemsByID.js';
import getProductById from '../../../helperFunctions/App/getProductById.js';

const RecommendedItems = ({ currItem, setCurrItem }) => {
  const [relatedItems, setRelatedItems] = useState(null);

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

  if (!relatedItems) {
    return <p style={{ fontSize: '32px' }}>Loading...</p>;
  }

  if (!relatedItems || !Array.isArray(relatedItems)) {
    return (
      <div className="items-comp--reco_container">
        There are no related Products
      </div>
    );
  }

  const cards = relatedItems.map((product, i) => (
    <Card productID={product} key={i} setCurrItem={setCurrItem} />
  ));
  return <div className="items-comp--reco_container">{cards}</div>;
};

export default RecommendedItems;

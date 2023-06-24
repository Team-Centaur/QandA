import React from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';

const ItemsComponent = ({ currItem, setCurrItem }) => (
  <section>
    <RecommendedItems currItem={currItem} setCurrItem={setCurrItem} />
  </section>
);

export default ItemsComponent;

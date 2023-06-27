import React from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';

const ItemsComponent = ({ currItem, setCurrId }) => (
  <section className="items-comp--section">
    <RecommendedItems currItem={currItem} setCurrId={setCurrId} />
  </section>
);

export default ItemsComponent;

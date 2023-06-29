import React from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';
import OutfitItems from './OutfitItems/OutfitItems.jsx';

const ItemsComponent = ({ currItem, setCurrId }) => (
  <section className="items-comp--section">
    <RecommendedItems currItem={currItem} setCurrId={setCurrId} />
    <OutfitItems currItem={currItem} />
  </section>
);

export default ItemsComponent;

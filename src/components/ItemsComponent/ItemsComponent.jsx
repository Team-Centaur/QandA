import React from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';
import OutfitItems from './OutfitItems/OutfitItems.jsx';

const ItemsComponent = ({
  currItem,
  currStyles,
  currAvgRating,
  currentStyle,
  setCurrId,
  setCurrItem,
  setCurrStyles,
  setCurrAvgRating,
  setCurrentStyle,
}) => (
  <section className="items-comp--section">
    <RecommendedItems
      currItem={currItem}
      setCurrId={setCurrId}
      setCurrItem={setCurrItem}
      setCurrStyles={setCurrStyles}
      setCurrAvgRating={setCurrAvgRating}
      setCurrentStyle={setCurrentStyle}
    />
    <OutfitItems
      currItem={currItem}
      currStyles={currStyles}
      currentStyle={currentStyle}
      currAvgRating={currAvgRating}
    />
  </section>
);

export default ItemsComponent;

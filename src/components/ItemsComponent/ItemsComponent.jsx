import React from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';
import OutfitItems from './OutfitItems/OutfitItems.jsx';

const ItemsComponent = ({
  currItem,
  currStyles,
  currAvgRating,
  setCurrId,
  setCurrItem,
  setCurrStyles,
  setCurrReviewMeta,
  setCurrAvgRating,
}) => (
  <section className="items-comp--section">
    <RecommendedItems
      currItem={currItem}
      setCurrId={setCurrId}
      setCurrItem={setCurrItem}
      setCurrStyles={setCurrStyles}
      setCurrReviewMeta={setCurrReviewMeta}
      setCurrAvgRating={setCurrAvgRating}
    />
    <OutfitItems
      currItem={currItem}
      currStyles={currStyles}
      currAvgRating={currAvgRating}
    />
  </section>
);

export default ItemsComponent;

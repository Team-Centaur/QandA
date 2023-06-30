import React from 'react';
import RecommendedItems from './RecommendedItems/RecommendedItems.jsx';
import OutfitItems from './OutfitItems/OutfitItems.jsx';

const ItemsComponent = ({
  currItem,
  setCurrId,
  setCurrItem,
  setCurrStyles,
  setCurrReviewMeta,
  setCurrAvgReview,
}) => (
  <section className="items-comp--section">
    <RecommendedItems
      currItem={currItem}
      setCurrId={setCurrId}
      setCurrItem={setCurrItem}
      setCurrStyles={setCurrStyles}
      setCurrReviewMeta={setCurrReviewMeta}
      setCurrAvgReview={setCurrAvgReview}
    />
    <OutfitItems currItem={currItem} />
  </section>
);

export default ItemsComponent;

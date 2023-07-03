import React, { useContext, useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import CurrContext from '../../../store/curr-item-context.jsx';
import TableRow from './TableRow/TableRow.jsx';
import './CompareModal.css';

const CompareModal = ({ cardItem, setOpenModal }) => {
  const [comparedFeatures, setComparedFeatures] = useState([]);
  const currCtx = useContext(CurrContext);
  const [currItem, setCurrItem] = useState(currCtx.currItem);

  // Helper
  const createComparison = () => {
    // If features doesnt exist assign empty array
    if (!currItem.features) {
      currItem.features = [];
    }
    if (!cardItem.features) {
      cardItem.features = [];
    }

    // Create an object to store each feature as a property and null place holdervalues within it for each item
    const featuresObj = {};
    [...currItem.features, ...cardItem.features].forEach((feature) => {
      featuresObj[feature.feature] = { item1: null, item2: null };
    });

    // Populate the object with the feature values from the items
    [currItem.features, cardItem.features].forEach((itemFeatures, i) => {
      itemFeatures.forEach((feature) => {
        featuresObj[feature.feature][`item${i + 1}`] = feature.value || null;
      });
    });

    // Convert featuresObj to array
    const featuresArr = Object.entries(featuresObj).map(([feature, items]) => ({
      feature,
      ...items,
    }));

    setComparedFeatures(featuresArr);
  };

  // Use Effect Hook
  useEffect(() => {
    createComparison();
  }, [currItem, cardItem]);

  ///// Dynamic elements
  const tableRowElements = comparedFeatures.map((item) => (
    <TableRow featureObj={item} />
  ));

  // Event Handlers
  const handleCloseModal = (e) => {
    setOpenModal(false);
  };

  return (
    <div className="item-comp-modal">
      <FaXmark
        className="item-comp-modal--close_btn"
        onClick={handleCloseModal}
      />
      <aside className="item-comp-modal--features_container">
        <div className="item-comp-modal--features_head">
          <span>{currItem.name}</span>
          <span></span>
          <span>{cardItem.name}</span>
        </div>
        <ul className="item-comp-modal--features_list">{tableRowElements}</ul>
      </aside>
    </div>
  );
};
export default CompareModal;

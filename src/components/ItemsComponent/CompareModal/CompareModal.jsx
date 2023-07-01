import React, { useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { each } from 'underscore';

import TableRow from './TableRow/TableRow.jsx';
import './CompareModal.css';

// const CompareModal = ({ currItem, cardItem }) => {
//   const createComparison = () => {
//     console.log(currItem, cardItem);
//     // console.log(currItem.features, cardItem.features);
//     if (!currItem.features) {
//       currItem.features = [];
//     }
//     if (!cardItem.features) {
//       cardItem.features = [];
//     }

//     return [currItem.features, cardItem.features].reduce((acc, item, i) => {
//       item.forEach((feature) => {
//         if (!acc[feature.feature]) {
//           acc[feature.feature] = {};
//         }
//         acc[feature.feature][`item${i + 1}`] = feature.value || null;
//       });

//       return acc;
//     }, {});
//   };

const CompareModal = ({ currItem, cardItem, setOpenModal }) => {
  const [comparedFeatures, setComparedFeatures] = useState([]);

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

  useEffect(() => {
    createComparison();
  }, [currItem, cardItem]);

  const tableRowElements = comparedFeatures.map((item) => (
    <TableRow featureObj={item} />
  ));

  const handleCloseModal = (e) => {
    setOpenModal(false);
  };

  console.log(comparedFeatures);

  // Go through each of the features
  //   return (
  //     <div className="item-comp-modal">
  //       <FaXmark className="item-comp-modal--close_btn" />
  //       <table className="item-comp-modal--table">
  //         <thead className="item-comp-modal--table_head">
  //           <th>{currItem.name}</th>
  //           <th></th>
  //           <th>{cardItem.name}</th>
  //         </thead>
  //         <tbody className="item-comp-modal--table_body">
  //           {tableRowElements}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };
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

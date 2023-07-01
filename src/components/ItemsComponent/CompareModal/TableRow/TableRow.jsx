import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa6';

const TableRow = ({ featureObj }) => {
  const getItemDisplay = (item) => {
    return !item ? (
      <FaXmark />
    ) : featureObj.item === true ? (
      <FaCheck />
    ) : (
      item.replace(/"/g, '')
    );
  };

  return (
    <li className="item-comp-modal--features_item">
      <span style={{ textAlign: 'left' }}>
        {getItemDisplay(featureObj.item1)}
      </span>
      <span
        className="item-comp-modal--features_item--descrip"
        style={{
          textAlign: 'center',
          margin: '0, auto',
          whiteSpace: 'nowrap',
        }}
      >
        {featureObj.feature}
      </span>
      <span style={{ textAlign: 'right' }}>
        {getItemDisplay(featureObj.item2)}
      </span>
    </li>
  );
};

export default TableRow;

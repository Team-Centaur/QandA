import React from 'react';

const StarFilter = ({ stars, numOfVotes, sumOfVotes }) => {

  const starBarStyles = {
    height: '8px',
    width: '50%',
    backgroundColor: 'LightGray',
    borderRadius: '50px',
    margin: '0px',
    display: 'inline-block'
  };

  const starBarFillStyles = {
    height: '100%',
    width: (!!numOfVotes ? (numOfVotes / sumOfVotes * 100 + '%') : 0), // do not render if NaN
    backgroundColor: 'MediumSeaGreen',
    borderRadius: 'inherit',
  };


  return (
    <div className='starFilter'>
      <span>{stars} Stars</span>
      <div className='starBar' style={starBarStyles}>
        <div className='starBarFill' style={starBarFillStyles}>
        </div>
      </div>
      <span>{numOfVotes || '0'}</span>
    </div>
  );
};

export default StarFilter;
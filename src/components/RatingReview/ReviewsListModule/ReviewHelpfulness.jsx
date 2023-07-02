import React from 'react';

const ReviewHelpfulness = ({ reviewHelpfulness, updateHelpfulness }) => {
  return (
    <div className="reviewHelpfulness">
      Was this review helpful?
      <button onClick={updateHelpfulness}>Yes ({reviewHelpfulness})</button>
      {/* <button>No (0)</button> */}
    </div>
  );
};

export default ReviewHelpfulness;

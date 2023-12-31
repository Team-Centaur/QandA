import React from 'react';

const RecommendInput = ({ setRecommendInput }) => (
  <>
    <h4>Do you recommend this product?</h4>
    <input
      type="radio"
      id="recYes"
      value="yes"
      name="recommended"
      defaultChecked={true}
      onChange={(e) => setRecommendInput(e.target.value)}
      required
    />
    <label htmlFor="recYes"> Yes </label>
    <input type="radio" id="recNo" value="no" name="recommended" />
    <label htmlFor="recNo"> No </label>
  </>
);

export default RecommendInput;

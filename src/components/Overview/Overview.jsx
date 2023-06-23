import React from "react";

const Overview = ({currItem}) => {
  console.log(currItem);
  return (
    <section className = "overview-section">
    <div className = "promotion-container">Current Promotion Container</div>
    <div className = "product-container">
      Image Gallery and Product Overview Container
      <div className = "image-gallery-container">Image Gallery</div>
      <div className = "product-details-container">Product Overview</div>
    </div>
    <div className = "description-container">
      Description container
    </div>
  </section>
  )
};

export default Overview;


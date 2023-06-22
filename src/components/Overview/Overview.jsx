import React from "react";

const Overview = (props) => {
  return (
    <section>
    <div className = "promotion-container">Current Promotion Container</div>
    <div className = "product-container">
      Image Gallery and Product Overview Container
      <div className = "image-gallery-container">Image Gallery</div>
      <div clasName = "product-details-container">Product Overview</div>
    </div>
    <div className = "description-container">
      Description container
    </div>
  </section>
  )
};

export default Overview;

import React from "react";
import Card from "./Card/Card.jsx";

const ItemsComponent = ({ currItem }) => {
  console.log(currItem);
  return (
    <section>
      <Card product={currItem}/>
    </section>
  );
};

export default ItemsComponent;

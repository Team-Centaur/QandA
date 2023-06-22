import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import getRandomProd from "../helperFunctions/App/getRandomProd.js";
import Overview from "./Overview/Overview.jsx";
import ItemsComponent from "./ItemsComponent/ItemsComponent.jsx";
import QuesAnswer from "./QuesAnswer/QuesAnswer.jsx";
import RatingReview from "./RatingReview/RatingReview.jsx";

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [currItem, setCurrItem] = useState({});
  useEffect(() => {
    getRandomProd().then((data) => {
      setCurrItem(data);
    });
  }, []);

  return (
    <div>
      <h1>Hello worlds!</h1>
      <Overview />
      <ItemsComponent />
      <QuesAnswer />
      <RatingReview />
    </div>
  );
};

export default App;

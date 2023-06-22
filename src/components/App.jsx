import React, { Component } from "react";
import Overview from "./Overview/Overview.jsx";
import ItemsComponent from "./ItemsComponent/ItemsComponent.jsx";
import QuesAnswer from "./QuesAnswer/QuesAnswer.jsx";
import RatingReview from "./RatingReview/RatingReview.jsx";
class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello worlds!</h1>
        <Overview />
        <ItemsComponent />
        <QuesAnswer />
        <RatingReview />
      </div>
    );
  }
}

export default App;

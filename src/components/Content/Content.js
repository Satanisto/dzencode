import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ParishesContainer from "./Parishes/ParishesContainer";
import ProductsContaner from "./Products/ProductsContaner";

export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <Switch>
          <Route exact path="/" component={ParishesContainer} />
          <Route path="/products" component={ProductsContaner} />
        </Switch>
      </div>
    );
  }
}

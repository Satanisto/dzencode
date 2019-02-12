import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import OrdersContainer from "./Orders/OrdersContainer";
import ProductsContaner from "./Products/ProductsContaner";

export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <Switch>
          <Route exact path="/" component={OrdersContainer} />
          <Route path="/products" component={ProductsContaner} />
        </Switch>
      </div>
    );
  }
}

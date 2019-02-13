import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Orders from "./Orders/Orders";
import Products from "./Products/Products";

export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <Switch>
          <Route exact path="/" component={Orders} />
          <Route path="/products" component={Products} />
        </Switch>
      </div>
    );
  }
}

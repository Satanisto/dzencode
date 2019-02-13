import React, { Component } from "react";
import TopMenu from "./components/TopMenu/TopMenu";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import Content from "./components/Content/Content";
import rootReducer from "./store/reducers";
import Socket from "./components/Socket";

import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(rootReducer);

window.onload = () => {
  Socket.emit("ordersAndProducts");
  Socket.emit("date");
  Socket.emit("changeActiveUsers");
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="content-wrapper">
          <TopMenu />
          <div className="main-wrapper">
            <NavigationMenu />
            <Content />
          </div>
        </div>
      </Provider>
    );
  }
}

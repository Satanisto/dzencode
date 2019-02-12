import React, { Component } from "react";
import HeaderContainer from "./components/Header/HeaderContainer";
import Aside from "./components/Aside/Aside";
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
          <HeaderContainer />
          <div className="main-wrapper">
            <Aside />
            <Content />
          </div>
        </div>
      </Provider>
    );
  }
}

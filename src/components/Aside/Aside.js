import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Aside extends Component {
  render() {
    return (
      <div className="aside">
        <div className="img-settings">
          <img src="./img/face.jpeg" alt="face" />
          <div className="settings">
            <img src="./img/settings.svg" alt="settings" />
          </div>
        </div>
        <div className="menu">
          <ul>
            <Link to="/">
              <li>Приход</li>
            </Link>
            <Link to="/products">
              <li>Продукты</li>
            </Link>
            <Link to="/groups">
              <li>Группы</li>
            </Link>
            <Link to="/users">
              <li>Пользователи</li>
            </Link>
            <Link to="/settings">
              <li>Настройки</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

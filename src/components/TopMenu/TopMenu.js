import React, { Component } from "react";
import Socket from "../Socket";

import DateFormatting from "../DateFormatting";

export default class TopMenu extends Component {
  componentWillMount() {
    Socket.on("date", data => {
      const date = DateFormatting(data.date);

      this.props.setDate(date);
    });

    Socket.on("changeActiveUsers", data => {
      this.props.changeActiveUsers(data.active_users);
    });

    setInterval(() => {
      Socket.emit("date");
      Socket.emit("changeActiveUsers");
    }, 100);
  }

  time() {}

  render() {
    return (
      <div className="TopMenu">
        <div className="left">
          <div className="icon-name">
            <img src="./img/person.svg" alt="person" />
            <div className="name">Inventory</div>
          </div>
          <div className="search">
            <input type="text" placeholder="Поиск" />
          </div>
        </div>
        <div className="right">
          <div className="active-users">
            Активных <br /> пользователей {this.props.active_users}
          </div>
          <div className="date-container">
            <div className="day">{this.props.date.nameOfDay}</div>
            <div className="date-time">
              <div className="date">
                {this.props.date.day} {this.props.date.month},{" "}
                {this.props.date.year}
              </div>
              <div className="time-container">
                <div className="icon">
                  <img src="./img/time.svg" alt="time" />
                </div>
                <div className="time">{this.props.date.time}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

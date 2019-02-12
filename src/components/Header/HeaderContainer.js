import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header";
import { setDate, changeActiveUsers } from "../../store/Header/actions";

class HeaderCotainer extends Component {
  render() {
    return (
      <div>
        <Header
          date={this.props.date}
          active_users={this.props.active_users}
          setDate={this.props.setDate}
          changeActiveUsers={this.props.changeActiveUsers}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: state.header.date,
    active_users: state.header.active_users
  };
};

const mapDispatchToProps = {
  setDate,
  changeActiveUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderCotainer);

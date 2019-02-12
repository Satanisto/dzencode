import React, { Component } from "react";
import { connect } from "react-redux";

import TopMenu from "./TopMenu";
import { setDate, changeActiveUsers } from "../../store/TopMenu/actions";

class TopMenuCotainer extends Component {
  render() {
    return (
      <div>
        <TopMenu
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
    date: state.topmenu.date,
    active_users: state.topmenu.active_users
  };
};

const mapDispatchToProps = {
  setDate,
  changeActiveUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenuCotainer);

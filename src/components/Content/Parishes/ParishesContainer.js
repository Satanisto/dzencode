import React, { Component } from "react";
import Parishes from "./Parishes";
import { connect } from "react-redux";

import {
  setAPI,
  toggleState,
  changeActiveParish,
  changeActiveProduct
} from "../../../store/Content/actions";

class ParishesContainer extends Component {
  render() {
    return (
      <div>
        <Parishes
          data={this.props.data}
          activeParish={this.props.activeParish}
          activeProduct={this.props.activeProduct}
          stateOfInterface={this.props.stateOfInterface}
          setAPI={this.props.setAPI}
          toggleState={this.props.toggleState}
          changeActiveParish={this.props.changeActiveParish}
          changeActiveProduct={this.props.changeActiveProduct}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.content.data,
    stateOfInterface: state.content.stateOfInterface,
    activeParish: state.content.activeParish,
    activeProduct: state.content.activeProduct
  };
};

const mapDispatchesToProps = {
  setAPI,
  toggleState,
  changeActiveParish,
  changeActiveProduct
};

export default connect(
  mapStateToProps,
  mapDispatchesToProps
)(ParishesContainer);

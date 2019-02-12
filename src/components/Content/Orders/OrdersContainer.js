import React, { Component } from "react";
import Orders from "./Orders";
import { connect } from "react-redux";

import {
  setAPI,
  toggleState,
  changeActiveOrder,
  changeActiveProduct
} from "../../../store/Content/actions";

class OrdersContainer extends Component {
  render() {
    return (
      <div>
        <Orders
          data={this.props.data}
          activeOrder={this.props.activeOrder}
          activeProduct={this.props.activeProduct}
          stateOfInterface={this.props.stateOfInterface}
          setAPI={this.props.setAPI}
          toggleState={this.props.toggleState}
          changeActiveOrder={this.props.changeActiveOrder}
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
    activeOrder: state.content.activeOrder,
    activeProduct: state.content.activeProduct
  };
};

const mapDispatchesToProps = {
  setAPI,
  toggleState,
  changeActiveOrder,
  changeActiveProduct
};

export default connect(
  mapStateToProps,
  mapDispatchesToProps
)(OrdersContainer);

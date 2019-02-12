import React, { Component } from "react";
import Products from "./Products";

import { connect } from "react-redux";

import {
  setAPI,
  toggleState,
  changeActiveOrder,
  changeActiveProduct,
  setSearchValuesType,
  setSearchValuesSpecification
} from "../../../store/Content/actions";

class ProductsContainer extends Component {
  render() {
    return (
      <div>
        <Products
          data={this.props.data}
          activeOrder={this.props.activeOrder}
          activeProduct={this.props.activeProduct}
          stateOfInterface={this.props.stateOfInterface}
          type={this.props.type}
          specification={this.props.specification}
          setAPI={this.props.setAPI}
          toggleState={this.props.toggleState}
          changeActiveOrder={this.props.changeActiveOrder}
          changeActiveProduct={this.props.changeActiveProduct}
          setSearchValuesType={this.props.setSearchValuesType}
          setSearchValuesSpecification={this.props.setSearchValuesSpecification}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.content.data,
  stateOfInterface: state.content.stateOfInterface,
  activeOrder: state.content.activeOrder,
  activeProduct: state.content.activeProduct,
  type: state.content.type,
  specification: state.content.specification
});

const mapDispatchesToProps = {
  setAPI,
  toggleState,
  changeActiveOrder,
  changeActiveProduct,
  setSearchValuesType,
  setSearchValuesSpecification
};

export default connect(
  mapStateToProps,
  mapDispatchesToProps
)(ProductsContainer);

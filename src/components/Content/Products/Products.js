import React, { Component } from "react";

import Socket from "../../Socket";
import DateFormatting from "../../DateFormatting";

import { connect } from "react-redux";

import {
  setAPI,
  toggleState,
  changeActiveOrder,
  changeActiveProduct,
  setSearchValuesType,
  setSearchValuesSpecification
} from "../../../store/Content/actions";

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
)(
  class Products extends Component {
    componentWillMount() {
      Socket.on("ordersAndProducts", data => {
        this.props.setAPI(data);
      });

      setInterval(() => {
        Socket.emit("ordersAndProducts");
      }, 5000);

      setTimeout(() => {
        if (this.props.data.products) {
          var { types, specifications } = this.getTypesAndSpecifications();

          if (this.props.type === "" && this.props.specification === "") {
            this.props.setSearchValuesType(types[0]);
            this.props.setSearchValuesSpecification(specifications[0]);
          }
        }
      }, 500);
    }

    renderProducts() {
      const { data } = this.props;

      if (data.products && data.orders) {
        const products = data.products.filter(
          value =>
            value.type === this.props.type &&
            value.specification === this.props.specification
        );
        const orders = data.orders;

        return products.map((value, index) => {
          const guarantee = {
            start: DateFormatting(value.guarantee.start),
            end: DateFormatting(value.guarantee.end)
          };

          const USD = value.price[0]
            ? value.price[0].symbol === "USD"
              ? value.price[0].value
              : value.price[1]
              ? value.price[1].symbol === "USD"
                ? value.price[1].value
                : 0
              : 0
            : 0;

          const UAH = value.price[0]
            ? value.price[0].symbol === "UAH"
              ? value.price[0].value
              : value.price[1]
              ? value.price[1].symbol === "UAH"
                ? value.price[1].value
                : 0
              : 0
            : 0;

          const USDDefault = value.price[0]
            ? value.price[0].symbol === "USD"
              ? value.price[0].isDefault
              : value.price[1]
              ? value.price[1].symbol === "USD"
                ? value.price[1].isDefault
                : 0
              : 0
            : 0;

          const UAHDefault = value.price[0]
            ? value.price[0].symbol === "UAH"
              ? value.price[0].isDefault
              : value.price[1]
              ? value.price[1].symbol === "UAH"
                ? value.price[1].isDefault
                : 0
              : 0
            : 0;

          const price = {
            USD,
            UAH,
            USDDefault,
            UAHDefault
          };

          return (
            <div key={index} className="item product">
              <div className="products-wrapper__state__foto">
                <span
                  className={
                    "products-wrapper__state" +
                    (value.isNew ? " green" : " dark")
                  }
                />
                <img src={"./img/products/" + value.photo} alt="product" />
              </div>
              <div className="products-wrapper__name__serial-number">
                <span className="products-wrapper__name">{value.title}</span>
                <span className="products-wrapper__serial-number">
                  {value.serialNumber}
                </span>
              </div>
              <div
                className={
                  "products-wrapper-is-free" +
                  (value.isNew ? " green" : " dark")
                }
              >
                {value.isNew ? "Свободен" : "В ремонте"}
              </div>
              <div className="products-wrapper__date">
                <div className="start">
                  с {guarantee.start.day} / {guarantee.start.month} /{" "}
                  {guarantee.start.year}
                </div>
                <div className="end">
                  по {guarantee.end.day} / {guarantee.end.month} /{" "}
                  {guarantee.end.year}
                </div>
              </div>
              <div className={"products-wrapper-is-free"}>
                {value.isNew ? "Новый" : "Б / У"}
              </div>
              <div className="full-price">
                {price.USD > 0 ? (
                  <div
                    className={
                      "usd" +
                      (price.USDDefault >= price.UAHDefault ? " default" : "")
                    }
                  >
                    {price.USD} $
                  </div>
                ) : (
                  ""
                )}
                {price.UAH > 0 ? (
                  <div
                    className={
                      "uah" +
                      (price.UAHDefault >= price.USDDefault ? " default" : "")
                    }
                  >
                    {price.UAH} UAH
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="name-of-type">{value.type}</div>
              <div className="name-of-order">
                {orders.find(order => value.order === order.id).title}
              </div>
              <div className="products-wrapper__delete-btn">
                <button
                  onClick={() => {
                    Socket.emit("deleteProduct", value);
                  }}
                >
                  <img src="./img/delete.svg" alt="delete" />
                </button>
              </div>
            </div>
          );
        });
      }
    }

    getTypesAndSpecifications() {
      if (this.props.data.products) {
        var types = [];

        for (let index = 0; index < this.props.data.products.length; ++index) {
          if (types.indexOf(this.props.data.products[index].type) < 0) {
            types.push(this.props.data.products[index].type);
          }
        }

        var specifications = [];

        for (let index = 0; index < this.props.data.products.length; ++index) {
          if (
            specifications.indexOf(
              this.props.data.products[index].specification
            ) < 0
          ) {
            specifications.push(this.props.data.products[index].specification);
          }
        }

        return {
          types,
          specifications
        };
      }
    }

    renderSelect() {
      if (this.props.data.products) {
        var { types, specifications } = this.getTypesAndSpecifications();

        return (
          <div className="products__search-wrapper">
            <div className="products__search-type">
              Тип:
              <select
                onClick={event => {
                  this.props.setSearchValuesType(event.target.value);
                }}
              >
                {types.map((value, index) => (
                  <option key={index}>{value}</option>
                ))}
              </select>
            </div>
            <div className="products__search-specification">
              Спецификация:{" "}
              <select
                onClick={event => {
                  this.props.setSearchValuesSpecification(event.target.value);
                }}
              >
                {specifications.map((value, index) => (
                  <option key={index}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        );
      }
    }

    render() {
      return (
        <div className="content-container products">
          <div className="products__name__search">
            <h1>Продукты</h1>
            {this.renderSelect()}
          </div>
          <div className="items-wrapper products-container">
            {this.renderProducts()}
          </div>
        </div>
      );
    }
  }
);

import React, { Component } from "react";

import Socket from "../../Socket";
import DateFormatting from "../../DateFormatting";

const stateOfInterface = {
  DELETE_ORDER: "DELETE_ORDER",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  PRODUCTS_OF_ORDER: "PRODUCTS_OF_ORDER",
  DEFAULT: "DEFAULT"
};

export default class Orders extends Component {
  componentWillMount() {
    Socket.on("ordersAndProducts", data => {
      this.props.setAPI(data);
    });

    setInterval(() => {
      Socket.emit("ordersAndProducts");
    }, 5000);
  }

  renderDeleteOrder() {
    if (
      this.props.stateOfInterface === stateOfInterface.DELETE_ORDER &&
      this.props.activeOrder
    ) {
      const Order = this.props.activeOrder;
      const products = this.props.data.products;

      return (
        <div className="pop-up">
          <div className="pop-up__window">
            <button
              className="pop-up__close"
              onClick={() => this.props.toggleState(stateOfInterface.DEFAULT)}
            >
              +
            </button>
            <div className="pop-up__header">
              <h3>Вы уверенны, что хотите удалить этот приход?</h3>
            </div>
            <div className="pop-up__products-wrapper">
              {products
                .filter(value => Order.id === value.order)
                .map((value, index) => (
                  <div className="pop-up__product" key={index}>
                    <div className="pop-up__state__foto">
                      <span
                        className={
                          "pop-up__state" + (value.isNew ? " green" : " dark")
                        }
                      />
                      <img
                        src={"./img/products/" + value.photo}
                        alt="product"
                      />
                    </div>
                    <div className="pop-up__name__serial-number">
                      <span className="pop-up__name">{value.title}</span>
                      <span className="pop-up__serial-number">
                        {value.serialNumber}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="pop-up__question">
              <button
                className="pop-up__cancel"
                onClick={() => this.props.toggleState(stateOfInterface.DEFAULT)}
              >
                Отменить
              </button>
              <button
                className="pop-up__delete"
                onClick={() => {
                  this.props.toggleState(stateOfInterface.DEFAULT);
                  Socket.emit("deleteOrder", Order);
                }}
              >
                <img src="./img/delete-red.svg" alt="delete" /> Удалить
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  renderOrders() {
    const { data } = this.props;

    if (data.orders && data.products) {
      const orders = data.orders;
      const products = data.products;

      return orders.map((Order, index) => {
        const date = DateFormatting(new Date(Order.date));
        const contextProducts = products.filter(
          product => product.order === Order.id
        );
        const amount = contextProducts.length;

        const ordersIndex = orders.indexOf(
          orders.find(value => {
            return (
              value.id === this.props.activeOrder.id &&
              value.title === this.props.activeOrder.title
            );
          })
        );

        var price = {
          USD: 0,
          USDDEfault: 0,
          UAH: 0,
          UAHDEfault: 0
        };

        contextProducts.forEach(value => {
          if (value.price[0] && value.price[0].symbol === "USD") {
            price.USD += value.price[0].value;
            price.USDDEfault += value.price[0].isDefault;
          } else if (value.price[0] && value.price[0].symbol === "UAH") {
            price.UAH += value.price[0].value;
            price.UAHDEfault += value.price[0].isDefault;
          }

          if (value.price[1] && value.price[1].symbol === "USD") {
            price.USD += value.price[1].value;
            price.USDDEfault += value.price[1].isDefault;
          } else if (value.price[1] && value.price[1].symbol === "UAH") {
            price.UAH += value.price[1].value;
            price.UAHDEfault += value.price[1].isDefault;
          }
        }, 0);

        return (
          <div key={index} className="item Orders">
            {this.props.stateOfInterface !==
            stateOfInterface.PRODUCTS_OF_ORDER ? (
              <div className="name">{Order.title}</div>
            ) : (
              ""
            )}
            <div className="icon-more_amount-of-products">
              <button
                onClick={() => {
                  this.props.changeActiveOrder(Order);
                  this.props.toggleState(stateOfInterface.PRODUCTS_OF_ORDER);
                }}
              >
                <img src="./img/list.svg" alt="list" />
              </button>
              <div className="amount-of-products">
                <div className="amount">
                  <span>{amount}</span>
                  <br />
                  {amount % 10 === 1
                    ? "Продукт"
                    : amount % 10 >= 5 ||
                      amount % 10 === 0 ||
                      amount % 100 === 11
                    ? "Продуктов"
                    : "Продукта"}
                </div>
              </div>
            </div>
            <div className="date-time">
              <div className="time">
                {date.hour} / {date.minute}
              </div>
              <div className="date">
                {date.day} / {date.month} / {date.year}
              </div>
            </div>
            {this.props.stateOfInterface !==
            stateOfInterface.PRODUCTS_OF_ORDER ? (
              <div className="full-price">
                {price.USD > 0 ? (
                  <div
                    className={
                      "usd" +
                      (price.USDDEfault >= price.UAHDEfault ? " default" : "")
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
                      (price.UAHDEfault >= price.USDDEfault ? " default" : "")
                    }
                  >
                    {price.UAH} UAH
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {this.props.stateOfInterface !==
            stateOfInterface.PRODUCTS_OF_ORDER ? (
              <div className="delete-btn">
                <button
                  onClick={() => {
                    this.props.toggleState(stateOfInterface.DELETE_ORDER);
                    this.props.changeActiveOrder(Order);
                  }}
                >
                  <img src="./img/delete.svg" alt="delete" />
                </button>
              </div>
            ) : (
              ""
            )}
            {this.props.stateOfInterface ===
              stateOfInterface.PRODUCTS_OF_ORDER && index === ordersIndex ? (
              <div className="products-arrow">
                <img src="./img/arrow.svg" alt="arrow" />
              </div>
            ) : (
              ""
            )}
          </div>
        );
      });
    }
  }

  renderProducts() {
    const { data } = this.props;

    if (
      data.orders &&
      data.products &&
      this.props.stateOfInterface === stateOfInterface.PRODUCTS_OF_ORDER
    ) {
      const order = this.props.activeOrder;
      const products = data.products.filter(value => order.id === value.order);

      return (
        <div className="products-wrapper">
          <button
            className="products-wrapper__close"
            onClick={() => this.props.toggleState(stateOfInterface.DEFAULT)}
          >
            +
          </button>
          <h3 className="products-wrapper__name">{order.title}</h3>
          <div className="products-wrapper__add">
            <button>+</button>Добавить продукт
          </div>
          <div className="products-wrapper__products-container">
            {products.map((value, index) => (
              <div key={index} className="products-wrapper__product">
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
            ))}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="content-container Orders">
        {this.renderDeleteOrder()}
        <div className="content-name">
          <button className="add">
            <span>+</span>
          </button>
          <h1>Приходы</h1>
        </div>
        <div className="content-wrapper">
          <div
            className={
              "items-wrapper Orders-wrapper " +
              (this.props.stateOfInterface ===
              stateOfInterface.PRODUCTS_OF_ORDER
                ? "deployed"
                : "")
            }
          >
            {this.renderOrders()}
          </div>
          {this.renderProducts()}
        </div>
      </div>
    );
  }
}

const app = require("http").createServer();
const io = (module.exports.io = require("socket.io")(app));

var orders = [
  {
    id: 1,
    title: "Длинное предлинное придленючее название прихода",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    }
  },
  {
    id: 2,
    title: "Order 2",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    }
  },
  {
    id: 3,
    title: "Order 3",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return products;
    }
  }
];

var products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: "product1.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 }
    ],
    order: 1,
    date: "2017-06-29 12:09:33"
  },
  {
    id: 2,
    serialNumber: 12345,
    isNew: 1,
    photo: "product2.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 1 },
      { value: 2600, symbol: "UAH", isDefault: 0 }
    ],
    order: 2,
    date: "2017-06-29 12:09:33"
  },
  {
    id: 3,
    serialNumber: 12346,
    isNew: 0,
    photo: "product3.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 }
    ],
    order: 1,
    date: "2017-06-29 12:09:33"
  },
  {
    id: 4,
    serialNumber: 12347,
    isNew: 0,
    photo: "product3.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 }
    ],
    order: 1,
    date: "2017-06-29 12:09:33"
  },
  {
    id: 5,
    serialNumber: 12348,
    isNew: 0,
    photo: "product3.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 2",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 }
    ],
    order: 1,
    date: "2017-06-29 12:09:33"
  },
  {
    id: 6,
    serialNumber: 12349,
    isNew: 0,
    photo: "product1.jpg",
    title: "Product 1",
    type: "MonitorsA",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 1 },
      { value: 2600, symbol: "UAH", isDefault: 0 }
    ],
    order: 3,
    date: "2017-06-29 12:09:33"
  },
  {
    id: 7,
    serialNumber: 12304,
    isNew: 1,
    photo: "product3.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33"
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 1 },
      { value: 2600, symbol: "UAH", isDefault: 0 }
    ],
    order: 3,
    date: "2017-06-29 12:09:33"
  }
];

const PORT = process.env.PORT || 8080;

count = 0;

io.on("connection", socket => {
  console.log(`Connected ${socket.id}`);

  ++count;

  socket.on("date", data => {
    socket.emit("date", {
      date: new Date(Date.now())
    });
  });

  socket.on("changeActiveUsers", date => {
    socket.emit("changeActiveUsers", {
      active_users: count
    });
  });

  socket.on("ordersAndProducts", date => {
    socket.emit("ordersAndProducts", {
      orders,
      products
    });
  });

  socket.on("deleteOrder", data => {
    var element = orders.find(
      element => element.id === data.id && element.title === data.title
    );

    if (element) {
      var index = orders.indexOf(element);
      orders.splice(index, 1);
    }

    for(let index = 0; index < products.length; ++index) {
      if(products.order === data.id) {
        products.splice(index, 0)
      }
    }
    
    socket.emit("ordersAndProducts", {
      orders,
      products
    });

  });

  socket.on("deleteProduct", data => {
    var element = products.find(
      element =>
        element.id === data.id && element.serialNumber === data.serialNumber
    );

    if (element) {
      var index = products.indexOf(element);
      products.splice(index, 1);
    }

    socket.emit("ordersAndProducts", {
      orders,
      products
    });
  });

  socket.on("disconnect", () => {
    --count;
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

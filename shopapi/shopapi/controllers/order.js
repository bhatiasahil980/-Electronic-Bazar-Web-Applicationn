const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const orderOperations = require("../db/services/order_crud");

const orderController = {
  
  async history(request, response) {
    try {
      const doc = await orderOperations.history(request.body.custID);
      if (doc) {
        response
          .status(SUCCESS)
          .json({ doc });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["order.notfound"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["order.notfound"]});
    }
  },

  async search(request, response) {
    try {
      const doc = await orderOperations.search(request.body.emailid,request.body.keyword);
      if (doc) {
        response
          .status(SUCCESS)
          .json({ doc });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["order.notfound"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["order.notfound"]});
    }
  },

 
  add(request, response) {
    let orderObject = {
        customerID: request.body.custID,
        products: request.body.products,
        orderDate : request.body.date,
        status : request.body.status,
        modeOfPayment : request.body.payMode
    };
    const promise = orderOperations.add(orderObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["order.inserted"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["order.insertionfailed"],err });
      });
  },


};

module.exports = orderController;

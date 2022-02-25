const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const productOperations = require("../db/services/product_crud");

const productController = {
  
  async display(request, response) {
    try {
      const doc = await productOperations.display();
      if (doc) {
        response
          .status(SUCCESS)
          .json({ doc });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["product.notfound"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["product.notfound"]});
    }
  },

  

  async search(request, response) {
    try {
      const doc = await productOperations.search(request.body.query);
      if (doc) {
        response
          .status(SUCCESS)
          .json({ doc });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["product.notfound"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["product.notfound"]});
    }
  },
  
  add(request, response) {
    
    let productObject = {
      
        name: request.body.name,
        price: request.body.price,
        qty: request.body.quantity,
        category: request.body.category,
        specification : requet.body.specification,
        COD : request.body.COD,
        review : request.body.review,
        discount : request.body.discount,
        image: request.body.image,
        sellerDetails : request.body.sellerDetails
    };
    const promise = productOperations.add(productObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["product.inserted"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.insertionfailed"],err });
      });
  },

  async updateStocks(request, response) {
    try {
      const doc = await productOperations.updateStocks(request.body.products);
      if (doc) {
        response
          .status(SUCCESS)
          .json({ doc });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["product.notfound"]});
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["product.notfound"]});
    }
  },


};

module.exports = productController;

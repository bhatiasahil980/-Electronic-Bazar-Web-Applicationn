const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const cartOperations = require("../db/services/cart_crud");

const cartController = {
  
  async display(request, response) {
    try {
      const doc = await cartOperations.display(request.body.custID);
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

  async remove(request,response){
    try {
      const doc = await cartOperations.delete(request.body.pid);
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
    
    let cartObject = {
        _id : request.body.pid,
        customerID : request.body.custID,
        name: request.body.name,
        price: request.body.price,
        selectedQty : request.body.selectedQty,
        qty: request.body.qty,
        specification : request.body.specification,
        review  : request.body.review,
        discount : request.body.discount,
        image:  request.body.image,
        sellerDetails : request.body.sellerDetails
    };
    const promise = cartOperations.add(cartObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["cart.inserted"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.insertionfailed"],err });
      });
  },


};

module.exports = cartController;

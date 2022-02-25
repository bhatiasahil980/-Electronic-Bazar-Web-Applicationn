const orderModel = require("../models/order");

module.exports = {
  
  add(orderObject) {
    let promise = orderModel.create(orderObject);
    return promise;
  },

  async history(custID) {
    const doc = await orderModel.find({customerID : custID});
    if (doc) {
        return doc;
    }
    else {
        return null; 
    }
  },

  async search(userid,keyword) {
    const doc = await orderModel.find({customerID:userid,$text: {$search: keyword}});
    if (doc) {
        return doc;
    }
    else {
        return null; 
    }
  },

  async filter(query) {
    const doc = await orderModel.find({$text : {$search : query}});
    if (doc) {
        return doc;
    }
    else {
        return null; 
    }
  },
  
};

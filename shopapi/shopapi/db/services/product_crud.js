const ProductModel = require("../models/product");

module.exports = {
  
  add(productObject) {
    let promise = ProductModel.create(productObject);
    return promise;
  },
  
  async display() {
    const doc = await ProductModel.find({});
    if (doc) {
        return doc;
    }
    else {
        return null; 
    }
  },

  
  async search(query) {
    const doc = await ProductModel.find({$text: {$search: query}}).select({ "score": { "$meta": "textScore" } })
    .sort({ "score": { "$meta": "textScore" } });
    if (doc) {
        return doc;
    }
    else {
        return null; 
    }
  },

  
};

const cartModel = require("../models/cart");

module.exports = {
  
  add(cartObject) {
    let promise = cartModel.create(cartObject);
    return promise;
  },

  async display(custID) {
    const doc = await cartModel.find({customerID : custID});
    if (doc) {
        return doc;
    }
    else {
        return null; 
    }
  },

  async delete(pid){
    const doc = cartModel.deleteOne({ _id: pid }, function (err) {
      if(err){
        console.log(err);
        return {'message' : 'deletion fail'};
      }
      console.log('Inside function');
      return {'message':'successfull deletion !'};
    });
    return {'message':'successfull deletion !'};
  },

  async update(pid,updatedQty){
    const doc = cartModel.findOneAndUpdate({_id:pid},{selectedQty: updatedQty});
    if(doc){
      return doc;
    }
    else{
      return null;
    }
  },

  
};

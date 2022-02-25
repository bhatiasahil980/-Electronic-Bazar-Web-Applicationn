const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");

const cartSchema = new Schema(
  {
    _id : {type: SchemaTypes.String, required:true},
    customerID: { type: SchemaTypes.String, required: true, min: 3, max: 30 },
    name: { type: SchemaTypes.String, required: true, min: 5, max: 30 },
    price: { type: SchemaTypes.Decimal128, required: true },
    selectedQty: {type: SchemaTypes.Number, required: true},
    qty: {type: SchemaTypes.Number, required: true},
    specification : {type: SchemaTypes.Object, required: true},
    review  : { type: SchemaTypes.Decimal128 },
    discount : {type: SchemaTypes.Number},
    image: { type: SchemaTypes.String, required: true },
    sellerDetails : {type: SchemaTypes.Object, required: true}
  },
  { timestamps: true }
);
const CartModel = mongoose.model(SCHEMAS.CART, cartSchema);
module.exports = CartModel;

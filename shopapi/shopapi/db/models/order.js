const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const { SchemaType } = require("mongoose");

const orderSchema = new Schema(
  {
    customerID: { type: SchemaTypes.String, required: true, min: 3, max: 30 },
    products: {type: SchemaTypes.Array},
    orderDate : { type: SchemaTypes.Date, required: true},
    status : {type: SchemaTypes.String, required:true},
    modeOfPayment : { type: SchemaTypes.String, required: true }
  }
);
const orderModel = mongoose.model(SCHEMAS.ORDER, orderSchema);
module.exports = orderModel;

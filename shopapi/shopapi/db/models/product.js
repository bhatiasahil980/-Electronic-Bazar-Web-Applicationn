const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");

const productSchema = new Schema(
  {
    name: { type: SchemaTypes.String, required: true, min: 5, max: 30 },
    price: { type: SchemaTypes.Decimal128, required: true },
    qty: {type: SchemaTypes.Number, required: true},
    specification : {type: SchemaTypes.Object, required: true},
    COD : {type: SchemaTypes.Boolean, required: true},
    category : { type: SchemaTypes.String , required: true, min: 5, max: 30 },
    review  : { type: SchemaTypes.Decimal128 },
    discount : {type: SchemaTypes.Number},
    image: { type: SchemaTypes.String, required: true },
    sellerDetails : {type: SchemaTypes.Object, required: true}
  },
  { timestamps: true }
);
const ProductModel = mongoose.model(SCHEMAS.PRODUCTS, productSchema);
module.exports = ProductModel;

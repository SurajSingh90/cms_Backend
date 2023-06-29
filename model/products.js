const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seriesnumber: {
    type: String,
    required: true,
  },
  image: {
    // type: [String],
    type: String,
    // required: true,
  },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;

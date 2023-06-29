const mongoose = require("mongoose");

const purchageSchema = new mongoose.Schema({
  addresss: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registers",
    required: true,
  },
});

const Purchage = mongoose.model("Purchage", purchageSchema);

module.exports = Purchage;

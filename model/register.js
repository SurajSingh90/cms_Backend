const mongoose = require("mongoose");
const registerSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  Phonenumber: {
    type: Number,
  },
  // otp: {
  //   type: Number,
  // },
  // otpExpire: {
  //   type: Date,
  // },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: "users",
  },
});

const User = mongoose.model("Registers", registerSchema);
module.exports = User;

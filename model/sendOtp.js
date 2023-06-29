const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});
const otpModel = mongoose.model("OtpTwillio", otpSchema);
module.exports = otpModel;

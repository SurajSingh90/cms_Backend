const register = require("../model/register");
const twilio = require("twilio");
const accountSid = "AC453afd03056335cb4683e2945803f282";
const authToken = "080c1954af4d335370f6f553ff4818db";
const client = twilio(accountSid, authToken);
const otpModel = require("../model/sendOtp");
const otpGenerator = require("otp-generator");
const serviceSid = "VA1a696988f145d5ee28ebeabc65946118";
const bcrypt = require("bcrypt");
const jswt = require("jsonwebtoken");
const Token = require("../config/database");
exports.createRegistration = async (req, res) => {
  let obj = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    Phonenumber: req.body.Phonenumber,
    // otp: req.body.otp,
    role: req.body.role,
    password: req.body.password,
    email: req.body.email,
    // otpExpire: new Date(Date.now() + 10 * 60 * 1000),
  };
  try {
    obj.password = bcrypt.hashSync(req.body.password, 10);
    const alreadyNumbers = await register.findOne({
      email: obj.email,
    });
    if (alreadyNumbers) {
      return res.status(403).json({ message: "gmail Allready Exists" });
    }
    // const verifyOtpNumber = await otpModel.findOne({
    //   phoneNumber: obj.Phonenumber,
    // });
    // console.log("otpMOdel", verifyOtpNumber);
    // if (verifyOtpNumber && verifyOtpNumber.otp === obj.otp) {
    //   await otpModel.findOneAndDelete({ phoneNumber: obj.Phonenumber });

    //   const results = await register.create(obj);
    //   res.status(200).json({ message: "Your Registration Sccessfll" });
    // } else {
    //   res.status(400).json({ message: "Failed to verify" });
    // }
    const results = await register.create(obj);
    res
      .status(200)
      .json({ message: "Your Registration Sccessfll", Users: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.login = async (req, res) => {
  try {
    const finduser = await register.findOne({
      email: req.body.email,
    });

    if (!finduser) {
      return res.status(404).send({ message: "email Not Found" });
    }
    const validpassword = bcrypt.compareSync(
      req.body.password,
      finduser.password
    );
    if (!validpassword) {
      res.status(400).send({ msg: "Password is wrong" });
      return;
    }
    const token = jswt.sign({ id: finduser._id }, Token.TokenData);
    res.status(200).json({
      name: finduser.firstname,
      lastname: finduser.lastname,
      gmail: finduser.email,
      role: finduser.role,
      Token: token,
      id: finduser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.sendOtp = async (req, res) => {
  let { phonenumber } = req.body;
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  const otpData = new otpModel({
    phoneNumber: phonenumber,
    otp: OTP,
  });

  try {
    await otpData.save();

    client.messages
      .create({
        body: `Your OTP is ${OTP}`,
        to: `+91${phonenumber}`,
        from: "(774) 341-5583",
      })
      .then((message) => {
        console.log("OTP sent:", message.sid);
        res.json({ message: "OTP sent successfully" });
      })
      .catch((error) => {
        console.error("Error sending phone number OTP:", error);
        res.status(500).json({ message: "Error sending phone number OTP" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.getUsers = async (req, res) => {
  let { id } = req.params;
  const findUsers = await register.findOne({ _id: id });
  if (!findUsers) {
    return res.status(404).send({ message: "not founded" });
  }
  return res.status(200).send(findUsers);
};

exports.logouts = async (req, res) => {};

const jwt = require("jsonwebtoken");
const usersTyes = require("../model/register");
const Token = require("../config/database");
exports.verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  try {
    if (!token) {
      return res.status(404).send({ message: "TOken is missing" });
    }
    token = token.split("Bearer ")[1];
    jwt.verify(token, Token.TokenData, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        req.id = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log("the Error is ", err);
    return res.status(500).send({ message: " internal error ", err });
  }
};

exports.isadmin = async (req, res, next) => {
  try {
    const finduser = await usersTyes.findOne({ _id: req.id });
    if (finduser && finduser.role == "admin") {
      next();
    } else {
      return res.send({ msg: "admin role required" });
    }
  } catch (err) {
    res.status(401).send({ message: " internal error ", err });
    console.log("the Error is ", err);
  }
};

exports.ismanager = async (req, res, next) => {
  try {
    const finduser = await usersTyes.findOne({ _id: req.id });
    console.log(finduser);
    // finduser.forEach((element) => {
    if (finduser && finduser.role == "manager") {
      next();
    } else {
      return res.send({ msg: "manager role required" });
    }
    // });
  } catch (err) {
    res.status(401).send({ message: " internal error ", err });
    console.log("the Error is ", err);
  }
};

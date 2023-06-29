const express = require("express");
const routes = express.Router();
const {
  createRegistration,
  sendOtp,
  login,
  getUsers,
} = require("../controller/register");
routes.post("/v1/cretses", createRegistration);
routes.post("/sendotp/numbers", sendOtp);
routes.post("/account/singin", login);
routes.get("/get/users/:id", getUsers);
module.exports = {
  authroutes: routes,
};

const express = require("express");
const routes = express.Router();
const {
  createRegistration,
  sendOtp,
  login,
  getUsers,
  getallusers,
} = require("../controller/register");
routes.post("/v1/cretses", createRegistration);
routes.post("/sendotp/numbers", sendOtp);
routes.post("/account/singin", login);
routes.get("/get/users/:id", getUsers);
routes.get("/find/allusers", getallusers);
module.exports = {
  authroutes: routes,
};

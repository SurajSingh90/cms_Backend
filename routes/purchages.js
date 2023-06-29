const express = require("express");
const routes = express.Router();
const {
  createPurchage,
  getAllPurchages,
  getPurchageById,
} = require("../controller/purchagePrd");
routes.post("/cretses/purchages", createPurchage);
routes.get("/get/allProducts", getAllPurchages);
routes.get("/get/invoice/purchages/:id", getPurchageById);

module.exports = {
  purchagesroutes: routes,
};

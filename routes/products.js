const express = require("express");
const routes = express.Router();
const multer = require("multer");

const {
  createProducts,
  editProducts,
  AllProduct,
  getProduct,
  deleteProduct,
} = require("../controller/products");
const isadmin = require("../middleware/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage }).single("image");
// const uploads = multer({
//   storage: storage,
// }).single("image");
routes.post("/create/products", uploads, createProducts);
routes.put(
  "/updates/products/:id",
  uploads,

  editProducts
);
// [isadmin.verifyToken, isadmin.ismanager],
routes.get("/all/products", AllProduct);
routes.get("/get/product/byId/:id", getProduct);
routes.delete("/delete/products/:id", deleteProduct);
module.exports = {
  products: routes,
};

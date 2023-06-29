const products = require("../model/products");
const cloudinary = require("cloudinary");
const path = require("path");
cloudinary.config({
  cloud_name: "dzidawevj",
  api_key: "745231798445212",
  api_secret: "RU_ekzheCagO1QErVCps5P2C038",
});
exports.createProducts = async (req, res) => {
  console.log(req);
  const prdobj = {
    productname: req.body.productname,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    seriesnumber: req.body.seriesnumber,

    // image: [],
    image: req.file.path,
    // image: req.body.image,
  };
  try {
    // for (const file of req.files) {
    // const imageurl = await cloudinary.v2.uploader.upload(file.path);
    // prdobj.image.push(imageurl.secure_url);
    // }
    // const filePath = path.resolve(prdobj.image);
    const imageurl = await cloudinary.v2.uploader.upload(prdobj.image);
    prdobj.image = imageurl.secure_url;

    const result = await products.create(prdobj);

    return res
      .status(200)
      .json({ message: "Products Created Successfully", Products: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editProducts = async (req, res) => {
  const editId = req.params.editId;
  console.log("iddd", editId);
  try {
    const findProducts = await products.findOne(editId);
    console.log(findProducts);
    if (!findProducts) {
      return res.status(404).json({ message: "Products Not Founds" });
    }
    findProducts.productname = req.body.productname
      ? req.body.productname
      : findProducts.productname;
    findProducts.quantity = req.body.quantity
      ? req.body.quantity
      : findProducts.quantity;
    findProducts.price = req.body.price ? req.body.price : findProducts.price;
    findProducts.seriesnumber = req.body.seriesnumber
      ? req.body.seriesnumber
      : findProducts.seriesnumber;
    findProducts.description = req.body.description
      ? req.body.description
      : findProducts.description;
    findProducts.image = req.body.image ? req.body.image : findProducts.image;
    // if (req.file) {
    // for (const file of req.files) {
    //   const imageurl = await cloudinary.v2.uploader.upload(file.path);
    //   findProducts.image.push(imageurl.secure_url);
    // }
    // }
    const saveProduct = await findProducts.save();
    res
      .status(200)
      .json({ message: "Products Updates Scceesfull", Products: saveProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await products.findOneAndDelete({ _id: id });
    console.log("result", result);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProduct = async (req, res) => {
  const Productsid = req.params.id;

  try {
    const result = await products.findOne({ _id: Productsid });
    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.AllProduct = async (req, res) => {
  try {
    const result = await products.find();

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

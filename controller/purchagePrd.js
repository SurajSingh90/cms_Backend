const Purchage = require("../model/buyproduct");
const Product = require("../model/products");

exports.createPurchage = async (req, res) => {
  const {
    addresss,
    city,
    state,
    pincode,
    productID,
    userID,
    firstname,
    lastname,
  } = req.body;

  try {
    const purchage = new Purchage({
      addresss,
      firstname,
      lastname,
      city,
      state,
      pincode,
      productID,
      userID,
    });

    const savedPurchage = await purchage.save();

    res.status(200).json({
      message: "Purchage created successfully",
      purchage: savedPurchage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPurchages = async (req, res) => {
  try {
    const purchages = await Purchage.find().populate("productID userID");

    res.status(200).json({
      message: "Purchages retrieved successfully",
      purchages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getPurchageById = async (req, res) => {
//   const { purchageId } = req.params;

//   try {
//     const purchage = await Purchage.findOne(purchageId).populate([
//       {
//         path: "productID",
//         select: "productname description price  seriesnumber",
//       },
//       {
//         path: "userID",
//         select: "firstname lastname Phonenumber",
//       },
//       // "productID userID"
//     ]);

//     if (!purchage) {
//       return res.status(404).json({ message: "Purchage not found" });
//     }

//     res.status(200).json({
//       message: "Purchage retrieved successfully",
//       purchage,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
exports.getPurchageById = async (req, res) => {
  const { id } = req.params;
  // console.log("User ID:", userId);

  try {
    const purchases = await Purchage.find({ userID: id }).populate([
      {
        path: "productID",
        select: "productname description price seriesnumber",
      },
      {
        path: "userID",
        select: "firstname lastname Phonenumber",
      },
    ]);

    console.log("Fetched purchases:", purchases);
    res.status(200).json({
      message: "Purchases retrieved successfully",
      purchases,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletePurchage = async (req, res) => {
  const { purchageId } = req.params;

  try {
    const deletedPurchage = await Purchage.findByIdAndDelete({
      _id: purchageId,
    });
    console.log(deletedPurchage);

    if (!deletedPurchage) {
      return res.status(404).json({ message: "Purchage not found" });
    }

    res.status(200).json({
      message: "Purchage deleted successfully",
      purchage: deletedPurchage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


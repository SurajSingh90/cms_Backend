const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authroutes, products, purchagesroutes } = require("./routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(authroutes, products, purchagesroutes);
mongoose
  .connect("mongodb+srv://suraj:suraj@cluster0.gmc40jo.mongodb.net/cms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect succesfull");
  })
  .catch((err) => console.log("errrrrrrrrrrrrr"));

app.listen(3500, () => {
  console.log(`server runing on port ${3500}`);
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

const requestRoutes = require("./routes/requestRoutes");
app.use("/request", requestRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const cartRequestRoutes = require("./routes/cartRequestRoutes");
app.use("/cartRequest", cartRequestRoutes);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

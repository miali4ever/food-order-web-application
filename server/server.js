// const fs = require("fs");
// const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 100000,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
    parameterLimit: 100000,
  })
);

//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// connect to routes folder
app.use(require("./routes/user-routes"));
app.use(require("./routes/products-routes"));
app.use(require("./routes/order-routes"));

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port);
    console.log(`Server is running on port ${port}!`);
  })
  .catch((err) => {
    console.log(err);
  });

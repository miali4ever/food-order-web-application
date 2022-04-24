const express = require("express");
const router = express.Router();

// This will help us connect to the database
const productsController = require("../controllers/product-controller");

// get the products collection from mongodb and pass it to http://localhost:5000/foods foods collection
router.get("/foods", productsController.products);

module.exports = router;

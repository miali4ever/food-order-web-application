const express = require("express");
const orderController = require("../controllers/order-controllers");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// get the information from register route and save the data to users collection in mongodb
router.post("/orders", orderController.postOrders);

router.get("/:userId/orders", orderController.getOrders);

module.exports = router;

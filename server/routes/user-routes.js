const express = require("express");
const { check } = require("express-validator");
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

const userController = require("../controllers/user-controllers");

// get the information from register route and save the data to users collection in mongodb
router.post(
  "/register",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.register
);

//test area
// get the information from register route and save the data to users collection in mongodb
router.post("/login", userController.login);

module.exports = router;

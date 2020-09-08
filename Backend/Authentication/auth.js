const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");

router.use("/login", loginRoute);
router.use("/register", registerRoute);

module.exports = router;

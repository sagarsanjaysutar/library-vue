const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");

router.use(loginRoute);
router.use(registerRoute);

module.exports = router;

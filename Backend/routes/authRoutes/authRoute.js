const express = require("express");
const router = express.Router();

// Importing Routes
const registerRoute = require("./routes/register.js");
const loginRoute = require("./routes/login.js");
const verifyRoute = require("./routes/verify.js");

// Routing Requests
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/verify", verifyRoute);

module.exports = router;

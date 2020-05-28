const router = require("express").Router();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	if (req.headers["authorization"]) {
		// Get auth header value
		const bearerHeader = req.headers["authorization"];

		// Check if auth header is undefined
		if (typeof bearerHeader !== undefined) {
			// split at the space
			const bearer = bearerHeader.split(" ");

			// Get token from array
			const bearerToken = bearer[1];

			// Set token onto the req
			req.token = bearerToken;

			// call next
			next();
		} else {
			res.sendStatus(403);
		}
	} else {
		res.json({ message: "there is no jwt token in the header" });
	}
}

// Verify Tokens
router.get("/", verifyToken, (req, res) => {
	try {
		jwt.verify(
			req.token,
			"KAD▓Nih_2q8enudina%d8H@D92q8d#$%^",
			(err, auth_data) => {
				if (err) {
					if (err.name == "TokenExpiredError") {
						res.json({ message: "TokenExpired" });
					} else if (err.name == "JsonWebTokenError") {
						res.json({ message: "Invalid Signature" });
					} else {
						res.json({ message: "Invalid Token" });
						throw err;
					}
				}
				if (!err && auth_data) {
					res.json({ message: "Verified" });
				}
			}
		);
	} catch (error) {
		let date = new Date().toISOString();
		console.error("[", date, "]", error);
	}
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../../../models/userSchema");

router.post("/", (req, res) => {
	try {
		const { phone_number, password } = req.body;

		UserSchema.findOne({ phone_number: phone_number }, (err, doc) => {
			// Throw Error if any
			if (err) throw err;

			// No user found
			if (doc === null) res.json({ message: "User Not Found" });

			// User Found
			bcrypt.compare(password, doc.password, (err, isMatch) => {
				if (err) throw err;

				// Hashed passeord and provided Password are equal
				if (isMatch === true) {
					// Creating Payload for JWT (json-web-token)
					let payload = {
						name: doc.name,
						phone_number: doc.phone_number,
					};

					jwt.sign(
						payload,
						"KAD▓Nih_2q8enudina%d8H@D92q8d#$%^",
						{ expiresIn: "30s" },
						(err, token) => {
							if (err) throw err;
							else res.json({ token });
						}
					);
				}
			});
		});
	} catch (error) {
		let date = new Date().toISOString();
		console.error("[", date, "]", error);
		res.sendStatus(500).json({ message: "Server Error" });
	}
});

module.exports = router;

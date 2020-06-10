const express = require("express");
const router = express.Router();
const UserSchema = require("../../../models/userSchema");
const bcrypt = require("bcrypt");

function verifyEmail(req, res, next) {
	const {
		email
	} = req.body;
	if (/\w{1,}@\w{1,}.\w{2,}/g.test(email)) return next();
	else res.json({
		message: "Invalid Email Id"
	});
}

function verifyPhoneNumber(req, res, next) {
	const {
		phone_number
	} = req.body;
	if (/\d{10}/g.test(phone_number)) next();
	else res.json({
		message: "Invalid Phonenumber"
	});
}

function verifyPassword(req, res, next) {
	const {
		password
	} = req.body;
	if (
		/[A-Z]+/g.test(password) &&
		/\d+/g.test(password) &&
		/\W{1,}/g.test(password) &&
		password.length > 7
	)
		next();
	else res.json({
		message: "Not a Strong Password"
	});
}

router.post(
	"/",
	[verifyEmail, verifyPassword],
	(req, res) => {
		try {
			const {
				name,
				password,				
				email,
				type
			} = req.body;

			UserSchema.findOne({
				phone_number: phone_number
			}, (err, doc) => {
				// Throw error if any
				if (err) throw err;

				// If user already exist send a message
				if (doc) res.json({
					message: "User Already Exists"
				});

				// Proceed If user doesnt exist
				if (doc === null) {
					newUser = {};
					newUser.name = name;
					newUser.password = password;
					newUser.email = email;
					newUser.phone_number = phone_number;
					newUser.type = type;

					// Generate salt for hashing password
					bcrypt.genSalt(10, (err, salt) => {
						if (err) throw err;

						// Hashing the password
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw user;

							// Set password to hashed password
							newUser.password = hash;

							// Save user
							UserSchema.create(newUser)
								.then((user) => {
									res.json(user);
								})
								.catch((err) => {
									throw err;
								});
						});
					});
				}
			});
		} catch (error) {
			let date = new Date().toISOString();
			console.error("[", date, "]", error);
		}
	}
);

module.exports = router;
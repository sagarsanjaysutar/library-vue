const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: String,
		phone_number: Number,
		password: String,
		email: String,
		type: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("UserSchema", UserSchema, "users");

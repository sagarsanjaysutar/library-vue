const express = require("express");
const router = express.Router();

const { userModel } = require("../models/models");
const bcrypt = require("bcrypt");

const userTypes = ["student", "employee", "librarian"];

function verifyEmail(req, res, next) {
  const { email } = req.body;
  if (/\w{1,}@\w{1,}.\w{2,}/g.test(email)) return next();
  else
    res.json({
      message: "Invalid Email Id",
    });
}

function verifyPhoneNumber(req, res, next) {
  const { phone_number } = req.body;
  if (/\d{10}/g.test(phone_number)) next();
  else
    res.json({
      message: "Invalid Phonenumber",
    });
}

function verifyPassword(req, res, next) {
  const { password } = req.body;
  if (
    /[A-Z]+/g.test(password) &&
    /\d+/g.test(password) &&
    /\W{1,}/g.test(password) &&
    password.length > 7
  )
    next();
  else
    res.json({
      message: "Not a Strong Password",
    });
}

router.post("/register", (req, res) => {
  let userInfo = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userInfo.password, salt, (err, hash) => {
      if (err) {
        console.log("Something went wrong while hashing password.");
        res.status(400).send({ status: "Something went wrong. \n" + err });
      } else {
        userInfo.password = hash;
        userInfo.type = userTypes[Math.floor(Math.random() * userTypes.length)];
        userModel
          .countDocuments({ email: userInfo.email })
          .then((count) => {
            if (count === 0) {
              new userModel(userInfo).save().then(() => {
                console.log("Added a new user successfully.");
                console.log(userInfo);
                res
                  .status(200)
                  .send({ status: "Added a new user successfully." });
              });
            } else {
              console.log("Please use different email.");
              res.status(200).send({ status: "Please use different email." });
            }
          })
          .catch((err) => {
            res.status(400).send({ status: "Something went wrong. \n" + err });
          });
      }
    });
  });
});

module.exports = router;

//     }), (err, doc) => {
//       // Throw error if any
//       if (err) throw err;

//       // If user already exist send a message
//       if (doc)
//         res.json({
//           message: "User Already Exists",
//         });

//       // Proceed If user doesnt exist
//       if (doc === null) {
//         newUser = {};
//         newUser.name = name;
//         newUser.password = password;
//         newUser.email = email;
//         newUser.phone_number = phone_number;
//         newUser.type = type;

//         // Generate salt for hashing password
//         bcrypt.genSalt(10, (err, salt) => {
//           if (err) throw err;

//           // Hashing the password
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw user;

//             // Set password to hashed password
//             newUser.password = hash;

//             // Save user
//             userModel
//               .create(newUser)
//               .then((user) => {
//                 res.json(user);
//               })
//               .catch((err) => {
//                 throw err;
//               });
//           });
//         });
//       }
//     });
//   } catch (error) {
//     let date = new Date().toISOString();
//     console.error("[", date, "]", error);
//   }
// });

//router.post("/add-user", (req, res) => {
//   var userArr = Array();
//   userArr = req.body;
//   userArr.forEach((user) => {
//     if (user.firstName) {
//       var { firstName, lastName, email, password, type } = user;

//       var newUser = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password,
//         type: type,
//       };
//       userModel
//         .insertMany(newUser)
//         .then((result) => {
//           res.status(200).send({
//             status: "User inserted successfully.",
//           });
//         })
//         .catch((err) => {
//           res.status(406).send({
//             status: "Failed to add user.\n" + err,
//           });
//         });
//     }
//   });
// });

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/models");
const key = "KAD▓Nih_2q8enudina%d8H@D92q8d#$%^";

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login request recieved from "+ email)
  userModel
    .findOne({ email })
    .then((response) => {
      if (response) {
        bcrypt.compare(password, response.password).then((isMatch) => {
          if (isMatch === true) {
            let userInfo = {
              name: response.name,
              email: response.email,
              type: response.type,
            };
            userInfo.accessToken = jwt.sign(userInfo, key, {
              expiresIn: "23h",
            });
            console.log("Login successfull.")
            res.status(200).send(userInfo);
          } else {
            res.status(200).send({ status: "Wrong password." });
          }
        });
      } else {
        res.status(200).send({ status: "Couldn't find email." });
      }
    })
    .catch((err) => {
      res.status(400).send({ status: "Something went wrong. \n" + err });
    });
});

module.exports = router;


// Mihir's code
// try {
//   const { email, password } = req.body;

//   userModel.findOne({ email }, (err, doc) => {
//     // Throw Error if any
//     if (err) throw err;

//     // No user found
//     if (doc === null) res.json({ message: "User Not Found" });

//     // User Found
//     bcrypt.compare(password, doc.password, (err, isMatch) => {
//       if (err) throw err;

//       // Hashed passeord and provided Password are equal
//       if (isMatch === true) {
//         // Creating Payload for JWT (json-web-token)
//         let payload = {
//           name: doc.name,
//           email: doc.email,
//         };

//         jwt.sign(
//           payload,
//           "KAD▓Nih_2q8enudina%d8H@D92q8d#$%^",
//           { expiresIn: "30s" },
//           (err, token) => {
//             if (err) throw err;
//             else res.json({ token });
//           }
//         );
//       }
//     });
//   });
// } catch (error) {
//   let date = new Date().toISOString();
//   console.error("[", date, "]", error);
//   res.sendStatus(500).json({ message: "Server Error" });
// }

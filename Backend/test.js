const randomId = require("random-id");
const { bookModel, userModel } = require("./models/models");
function getBookID() {
  return "B_" + randomId(8, "aA0");
}
function getUserID() {
  return "U_" + randomId(8, "aA0");
}

// bookModel
//   .update({ b_id: "B_BEWGnQGI" }, { $inc: { issuedQuantity: -1 } })
//   .then(({ ok}}) => {
//     console.log(result);
//   });

// To add User ID
userModel.find().then((users) => {
  users.forEach((user) => {
    userModel
      .updateOne({ _id: user._id }, { $set: { u_id: getUserID() } })
      .then((result) => {
        console.log(result);
      });
  });
});

// To add Book ID
// bookModel.find().then((books) => {
//   books.forEach((book) => {
//     bookModel
//       .updateOne({ _id: book._id }, { $set: { b_id: getBookID() } })
//       .then((result) => {
//         console.log(result);
//       });
//   });
// });
//To delete older users
// userModel.deleteMany({ password: "password" }).then((result) => {
//   console.log(result);
// });

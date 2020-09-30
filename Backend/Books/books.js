const express = require("express");
const randomId = require("random-id");
const router = express.Router();
const { bookModel, issueReturnInfo } = require("../models/models");
const fineAmount = 10;
const issueDays = 6;

router.get("/books/newBooks", (req, res) => {
  console.group("Searching for new books.");
  const newBooks = bookModel.find().limit(4);
  newBooks
    .then((newBooks) => {
      if (newBooks) {
        console.log("Found " + newBooks.length + " new books.");
        console.groupEnd();
        res.status(200).send(newBooks);
      } else {
        console.log("No new books found!!");
        console.groupEnd();
        res.status(200).send({ status: "New books not founds." });
      }
    })
    .catch((err) => {
      console.log("Error in fetching new books. \n -- " + err);
      console.groupEnd();
      res
        .status(400)
        .send({ status: "Error in fetching new books.\n -- " + err });
    });
});

router.get("/books/issuedBooks", (req, res) => {
  const u_id = req.query.getIssuedBooks.u_id || "";
  console.group("Searching issued books for " + u_id);
  issueReturnInfo
    .find({ u_id })
    .then((books) => {
      console.log("Found " + books.length + " books issued.");
      res.status(200).send(books);
    })
    .catch((err) => {
      console.log("Couldn't get issued books for " + id + ".\n" + err);

      res.status(400).send({
        status: "Couldn't get issued books for " + id + ".\n" + err,
      });
    });
});

router.get("/books/searchedBooks", (req, res) => {
  const searchedTerm = req.query.searchQuery;
  console.group("Searching book " + searchedTerm + " in db.");
  bookModel
    .find({
      $or: [
        { name: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        { author: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        { genere: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
      ],
    })
    .then((searchedBooks) => {
      if (searchedBooks) {
        console.log(
          "Found " + searchedBooks.length + " containing term " + searchedTerm
        );
        console.groupEnd();
        res.status(200).send(searchedBooks);
      } else {
        console.log("No book found with '" + searchedTerm + "' in it.");
        console.groupEnd();
        res.status(200).send({
          status: "No book found with '" + searchedTerm + "' in it.",
        });
      }
    })
    .catch((err) => {
      console.log("Error in finding searched book. \n" + err);
      console.groupEnd();
      res.status(400).send({
        status: "Error in finding searched book.\n " + err,
      });
    });
});

router.post("/issue-book", (req, res) => {
  const { b_id, s_id, e_id } = req.body;
  console.group("Issuing " + b_id + " book for " + s_id + " by " + e_id + ".");
  bookModel
    .findOne({ b_id })
    .then((book) => {
      if (book) {
        const { totalQuantity, issuedQuantity } = book;
        const isBookAvaiblable = issuedQuantity < totalQuantity ? true : false;

        if (isBookAvaiblable) {
          const transaction_info = {
            t_id: "T_" + randomId(8, "aA0"),
            issuedOn: new Date(),
            issuedTo: s_id,
            issuedBook: b_id,
            issuedBy: e_id,
            // dueDate: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
            dueDate: new Date(
              new Date().setSeconds(new Date().getSeconds() + 15)
            ),
            dueDateExtensionNumber: 0,
          };
          new issueReturnInfo(transaction_info).save().then((transaction) => {
            if (transaction) {
              bookModel
                .update({ b_id: b_id }, { $inc: { issuedQuantity: 1 } })
                .then(({ ok }) => {
                  if (ok === 1) {
                    console.log("Book issued successfully.");
                    console.groupEnd();
                    res
                      .status(200)
                      .send({ status: "Book issued successfully." });
                  } else {
                    console.groupEnd();
                    res.status(400).send({
                      status:
                        "Error in issuing book,failed to update book quantity.",
                    });
                  }
                })
                .catch((err) => {
                  console.log(
                    "Error in issuing book, failed to update book quantity. \n." +
                      err
                  );
                  console.groupEnd();
                  res.status(400).send({
                    status: "Error in returning book. \n" + err,
                  });
                });
            } else {
              console.log("Failed to issue the book.");
              res.status(200).send({ status: "Failed to issue the book." });
            }
          });
        } else {
          console.log(b_id + " book is not available.");
          res.status(200).send({ status: b_id + "book is not available." });
        }
      } else {
        console.log(b_id + " book doesn't exists.");
        res.status(200).send({ status: b_id + " book doesn't exists." });
      }
    })
    .catch((err) => {
      console.log("Error in issuing book \n." + err);
      res.status(400).send({
        status: "Error in issuing book. \n" + err,
      });
    });
});

router.post("/return-book", (req, res) => {
  const { b_id, s_id, e_id, penalityPaidStatus } = req.body;
  console.group(
    "Returning " + b_id + " book for " + s_id + " by " + e_id + "."
  );

  issueReturnInfo
    .findOne({ issuedBook: b_id, issuedTo: s_id, returnedOn: null })
    .sort({ issuedOn: -1 })
    .then((transaction) => {
      if (transaction) {
        const currentDate = new Date();
        const isDue = transaction.dueDate - currentDate >= 0 ? false : true;
        if (isDue) {
          const dueDays = currentDate - transaction.dueDate;
          const penalty = dueDays * fineAmount;
          const penaltyInfo = { dueDays, penalty };
          console.log(penaltyInfo);

          if (penalityPaidStatus) {
            transaction.returnedOn = currentDate;
            transaction.returnedTo = e_id;
            transaction.overDueDays = dueDays;
            transaction.penalityAmount = penalty;
            transaction.penalityPaidStatus = penalityPaidStatus;
            new issueReturnInfo(transaction)
              .save()
              .then((result) => {
                bookModel
                  .update({ b_id: b_id }, { $inc: { issuedQuantity: -1 } })
                  .then(({ ok }) => {
                    if (ok === 1) {
                      console.groupEnd();
                      res
                        .status(200)
                        .send({ status: "Fine recieved. Thank you!" });
                    } else {
                      console.groupEnd();
                      res.status(400).send({
                        status:
                          "Error in returning book,failed to update book quantity.",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(
                      "Error in returning book, failed to update book quantity. \n." +
                        err
                    );
                    console.groupEnd();
                    res.status(400).send({
                      status: "Error in returning book. \n" + err,
                    });
                  });
              })
              .catch((err) => {
                console.groupEnd();
                res.status(400).send({
                  status:
                    "Error in returning book,failed to update transaction.",
                });
              });
          } else {
            res.status(200).send({ penaltyInfo: penaltyInfo });
          }
        } else {
          issueReturnInfo
            .update(
              { issuedBook: b_id, issuedTo: s_id, returnedOn: null },
              { returnedOn: new Date(), returnedTo: e_id }
            )
            .limit(1)
            .sort({ issuedOn: -1 })
            .then(({ ok }) => {
              if (ok === 1) {
                bookModel
                  .update({ b_id: b_id }, { $inc: { issuedQuantity: -1 } })
                  .then(({ ok }) => {
                    if (ok === 1) {
                      console.groupEnd();
                      res.status(200).send({ status: "Book returned." });
                    } else {
                      console.groupEnd();
                      res.status(400).send({
                        status:
                          "Error in returning book,failed to update book quantity.",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(
                      "Error in returning book, failed to update book quantity. \n." +
                        err
                    );
                    console.groupEnd();
                    res.status(400).send({
                      status: "Error in returning book. \n" + err,
                    });
                  });
              } else {
                console.groupEnd();
                res.status(400).send({
                  status:
                    "Error in returning book,failed to update transaction.",
                });
              }
            })
            .catch((err) => {
              console.log(
                "Error in returning book, failed to update  transaction. \n" +
                  err
              );
              console.groupEnd();
              res.status(400).send({
                status:
                  "Error in returning book, failed to update transaction. \n" +
                  err,
              });
            });
        }
      } else {
        console.log(
          "Error in returning book, failed to retrive transactions.\n" +
            transaction
        );
        console.groupEnd();
        res.status(400).send({
          status: "Error in returning book, failed to retrive transactions",
        });
      }
    })
    .catch((err) => {
      console.log("Error in returning book \n." + err);
      console.groupEnd();
      res.status(400).send({ status: "Error in returning book. \n" + err });
    });
});

module.exports = router;

router.post("/books", (req, res) => {
  var booksArr = Array();
  booksArr = req.body;
  booksArr.forEach((book) => {
    if (book.name) {
      var {
        name,
        author,
        coverPage,
        genere,
        isIssued,
        isReserved,
        quantity,
      } = book;

      var newBook = {
        name: name,
        author: author,
        coverPage: coverPage,
        genere: genere,
        isIssued: isIssued,
        isReserved: isReserved,
        quantity: quantity,
      };

      bookModel
        .insertMany(newBook)
        .then((response) => {
          console.log(newBook.name + " added successfully.");
          res.status(200).send({
            status: newBook.name + " added successfully.",
          });
        })
        .catch((err) => {
          console.log("Error in adding book \n --" + err);
          res.status(406).send({
            status: "Error in adding book \n --" + err,
          });
        });
    } else {
      console.log("Invalid Data");
      res.status(406).send({
        status: "Invalid Data.",
      });
    }
  });
});

// router.get("/books", (req, res) => {
//   const searchedTerm = req.query.searchedTerm || "";

//   const getNewBooks = req.query.getNewBooks || false;
//   const getIssuedBooks = req.query.getIssuedBooks !== undefined ? true : false;
//   const getSearchedBook =
//     searchedTerm != "" || searchedTerm != undefined ? true : false;

//   if (getNewBooks) {
//     console.group("Searching for new books.");
//     const newBooks = bookModel.find().limit(4);
//     newBooks
//       .then((newBooks) => {
//         if (newBooks) {
//           console.log("Found " + newBooks.length + " new books.");
//           res.status(200).send(newBooks);
//         } else {
//           console.log("No new books found!!");
//           res.status(200).send({ status: "New books not founds." });
//         }
//       })
//       .catch((err) => {
//         console.log("Error in fetching new books. \n -- " + err);
//         res
//           .status(400)
//           .send({ status: "Error in fetching new books.\n -- " + err });
//       });
//   } else if (getSearchedBook) {
//     console.group("Searching book " + searchedTerm + " in db.");
//     bookModel
//       .find({
//         $or: [
//           { name: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
//           { author: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
//           { genere: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
//         ],
//       })
//       .then((searchedBooks) => {
//         if (searchedBooks) {
//           console.log(
//             "Found " + searchedBooks.length + " containing term " + searchedTerm
//           );
//           res.status(200).send(searchedBooks);
//         } else {
//           console.log("No book found with '" + searchedTerm + "' in it.");
//           res.status(200).send({
//             status: "No book found with '" + searchedTerm + "' in it.",
//           });
//         }
//       })
//       .catch((err) => {
//         console.log("Error in finding searched book. \n" + err);
//         res.status(400).send({
//           status: "Error in finding searched book.\n " + err,
//         });
//       });
//   } else if (getIssuedBooks) {
//     const u_id = req.query.getIssuedBooks.u_id || "";
//     console.group("Searching issued books for " + u_id);
//     issueReturnInfo
//       .find({ u_id })
//       .then((books) => {
//         console.log("Found " + books.length + " books issued.");
//         res.status(200).send(books);
//       })
//       .catch((err) => {
//         console.log("Couldn't get issued books for " + id + ".\n" + err);

//         res.status(400).send({
//           status: "Couldn't get issued books for " + id + ".\n" + err,
//         });
//       });
//   } else {
//     console.log("Wrong parameter for getting book.");
//     res.status(200).send({ status: "Books not founds. \n" + err });
//   }
// });

//Return book code

// const returnedBook = req.body;
//Check if the book is in the issueReturnInfo
// issueReturnInfo
//   .countDocuments({
//     $and: [
//       {
//         issuedBook: mongoose.Types.ObjectId(returnedBook.issuedBook),
//       },
//       {
//         returnedOn: null,
//       },
//     ],
//   })
//   .then((count) => {
//     if (count > 0) {
//       //To check the dueDate, penalties, overdues, etc. We first find the record and insert routerropiate values
//       issueReturnInfo
//         .find({
//           issuedBook: mongoose.Types.ObjectId(returnedBook.issuedBook),
//         })
//         .then((response) => {
//           var issueReturnInfo_record = response;
//           var today = new Date();
//           //today.setDate(today.getDate() + 11) //Uncomment this to see add penalty.
//           var { overDueDays, totalFine } = checkPenalty(
//             issueReturnInfo_record[0].dueDate,
//             today
//           );
//           var penalityPaidStatus = overDueDays == 0 ? true : false;
//           //If fine is paid then only update the values and return the book.
//           if (penalityPaidStatus) {
//             issueReturnInfo
//               .update(
//                 {
//                   $and: [
//                     {
//                       issuedBook: mongoose.Types.ObjectId(
//                         returnedBook.issuedBook
//                       ),
//                     },
//                     { returnedOn: null },
//                   ],
//                 },
//                 {
//                   $set: {
//                     returnedTo: returnedBook.returnedTo,
//                     returnedOn: today,
//                     overDueDays: overDueDays,
//                     penalityAmount: totalFine,
//                     penalityPaidStatus: penalityPaidStatus,
//                   },
//                 }
//               )
//               .then(() => {
//                 res.status(200).send({
//                   status: "Book returned.",
//                 });
//               })
//               .catch((err) => {
//                 res.status(406).send({
//                   status: "Failed to return the book. " + err,
//                 });
//               });

//             bookModel.update(
//               { _id: returnedBook.issuedBook },
//               { $set: { isIssued: false } }
//             );
//           } else {
//             res.status(406).send({
//               status:
//                 "Pay the over due payment of " +
//                 totalFine +
//                 "rps for " +
//                 overDueDays +
//                 " days.",
//             });
//           }
//         });
//     } else {
//       throw new Error("--" + count);
//     }
//   })
//   .catch((err) => {
//     res.status(406).send({
//       status: "Book has not be issued. \n" + err,
//     });
//   });

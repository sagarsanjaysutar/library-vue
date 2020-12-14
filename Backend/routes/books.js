const express = require("express");
const randomId = require("random-id");
const router = express.Router();
const { bookModel, issueReturnInfo, userModel } = require("../db/db");
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
      res.status(400).send({ status: "Error in fetching new books.\n -- " + err });
    });
});
router.get("/books/issuedBooks", (req, res) => {
  const u_id = req.query.u_id;
  console.group("Getting issued books for " + u_id);

  issueReturnInfo
    .find({ issuedTo: u_id })
    .then((books) => {
      console.log("Found " + books.length + " books issued.");
      console.groupEnd();
      res.status(200).send(books);
    })
    .catch((err) => {
      console.log("Couldn't get issued books for " + id + ".\n" + err);
      console.groupEnd();
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
        { b_id: searchedTerm },
        { name: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        { author: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        { genere: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
      ],
    })
    .then((searchedBooks) => {
      if (searchedBooks) {
        console.log("Found " + searchedBooks.length + " containing term " + searchedTerm);
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

router.post("/book", (req, res) => {
  let book = req.body;
  console.group("Adding a new book :- " + book.name);
  book.b_id = "B_" + randomId(8, "aA0");
  book.coverPage = "https://m.media-amazon.com/images/I/71d3kAiuhLL._AC_UY327_QL65_.jpg";
  new bookModel(book)
    .save()
    .then(() => {
      console.log(book.name + " added successfully.");
      console.groupEnd();
      res.status(200).send({
        status: book.name + " added successfully.",
        b_id: book.b_id,
      });
    })
    .catch((err) => {
      console.log("Error in adding book \n --" + err);
      console.groupEnd();
      res.status(406).send({
        status: "Error in adding book \n --" + err,
      });
    });
});
router.delete("/book", ({ query }, res) => {
  const { b_id } = query;
  console.group("Deleting " + b_id);

  bookModel
    .deleteOne({ b_id })
    .then(({ deletedCount }) => {
      if (deletedCount) {
        console.log("Book removed successfully.");
        console.groupEnd();
        res.status(200).send({ status: "Book removed successfully." });
      } else {
        console.log("No such book found, failed to removed book.");
        console.groupEnd();
        res.status(400).send({ status: "No such book found, failed to removed book." });
      }
    })
    .catch((err) => {
      console.log("Couldn't delete book.\n" + err);
      console.groupEnd();
      res.status(400).send({ status: "Couldn't delete book." });
    });
});
router.put("/book", (req, res) => {
  let book = req.body;
  console.group("Editing book:- " + book.name);
  bookModel
    .updateOne({ b_id: book.b_id }, { $set: book })
    .then(({ nModified }) => {
      if (nModified > 0) {
        console.log("Updated book ");
        console.groupEnd();
        res.status(200).send({ status: "Updated book details successfully." });
      } else {
        console.log("Update failed");
        console.groupEnd();
        res.status(401).send({ status: "Updated failed." });
      }
    })
    .catch((err) => {
      console.log("Problem in server. Couldn't update users.\n" + err);
      console.groupEnd();
      res.status(500).send({ status: "Opps! Something went wrong." + err });
    });
});

router.post("/issue-book", (req, res) => {
  const { b_id, s_id, e_id } = req.body;
  console.group("Issuing " + b_id + " book for " + s_id + " by " + e_id + ".");
  bookModel.findOne({ b_id }).then((book) => {
    userModel
      .findOne({ u_id: s_id })
      .then((user) => {
        if (user) {
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
                dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                // dueDate: new Date(new Date().setSeconds(new Date().getSeconds() + 7)),
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
                        res.status(200).send({ status: "Book issued successfully." });
                      } else {
                        console.groupEnd();
                        res.status(400).send({
                          status: "Error in issuing book,failed to update book quantity.",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(
                        "Error in issuing book, failed to update book quantity. \n." + err
                      );
                      console.groupEnd();
                      res.status(400).send({
                        status: "Error in returning book. \n" + err,
                      });
                    });
                } else {
                  console.log("Failed to issue the book.");
                  console.groupEnd();
                  res.status(200).send({ status: "Failed to issue the book." });
                }
              });
            } else {
              console.log(b_id + " book is not available.");
              console.groupEnd();
              res.status(200).send({ status: b_id + "book is not available." });
            }
          } else {
            console.log(b_id + " book doesn't exists.");
            console.groupEnd();
            res.status(200).send({ status: b_id + " book doesn't exists." });
          }
        } else {
          console.log("Couldn't find user.");
          console.groupEnd();
          res.status(401).send({ status: "Couldn't find user." });
        }
      })
      .catch((err) => {
        console.log("Error in issuing book \n." + err);
        console.groupEnd();
        res.status(400).send({
          status: "Error in issuing book. \n" + err,
        });
      });
  });
});
router.post("/return-book", (req, res) => {
  const { b_id, s_id, e_id, penalityPaidStatus } = req.body;
  console.group("Returning " + b_id + " book for " + s_id + " by " + e_id + ".");

  issueReturnInfo
    .findOne({ issuedBook: b_id, issuedTo: s_id, returnedOn: null })
    .then((transaction) => {
      if (transaction) {
        const currentDate = new Date();
        const isDue = transaction.dueDate - currentDate >= 0 ? false : true;
        if (isDue) {
          const dueDays = currentDate - transaction.dueDate;
          const penalty = dueDays * fineAmount;
          const penaltyInfo = { dueDays, penalty };
          console.log(penaltyInfo);
          console.groupEnd();

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
                      res.status(200).send({ status: "Fine recieved. Thank you!" });
                    } else {
                      console.groupEnd();
                      res.status(400).send({
                        status: "Error in returning book,failed to update book quantity.",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(
                      "Error in returning book, failed to update book quantity. \n." + err
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
                  status: "Error in returning book,failed to update transaction.",
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
                        status: "Error in returning book,failed to update book quantity.",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(
                      "Error in returning book, failed to update book quantity. \n." + err
                    );
                    console.groupEnd();
                    res.status(400).send({
                      status: "Error in returning book. \n" + err,
                    });
                  });
              } else {
                console.groupEnd();
                res.status(400).send({
                  status: "Error in returning book,failed to update transaction.",
                });
              }
            })
            .catch((err) => {
              console.log("Error in returning book, failed to update  transaction. \n" + err);
              console.groupEnd();
              res.status(400).send({
                status: "Error in returning book, failed to update transaction. \n" + err,
              });
            });
        }
      } else {
        console.log("Error in returning book, failed to retrive transactions.\n" + transaction);
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
router.post("/reissue-book", (req, res) => {
  const { t_id } = req.body;
  console.group("Reissuing book " + t_id);
  issueReturnInfo
    .findOne({ t_id })
    .then((transaction) => {
      if (transaction) {
        if (transaction.dueDateExtensionNumber < 3) {
          transaction.dueDateExtensionNumber += 1;
          transaction.dueDate = new Date(new Date().setDate(new Date().getDate() + 8));
          new issueReturnInfo(transaction)
            .save()
            .then(() => {
              console.log("Re-issued book successfully.");
              res.status(200).send({
                status: "Re-issued book successfully.",
                dueDate: transaction.dueDate,
              });
            })
            .catch((err) => {
              console.log("Error in reissuing book \n." + err);
              console.groupEnd();
              res.status(400).send({ status: "Error in reissuing book. \n" + err });
            });
        } else {
          console.log("Maximum re-issuing is done, please visit library.");
          console.groupEnd();
          res.status(200).send({
            status: "Maximum re-issuing is done, please visit library.",
          });
        }
      } else {
        console.log("Error in returning book, failed to retrive transactions.\n" + transaction);
        console.groupEnd();
        res.status(400).send({
          status: "Error in reissuing book, failed to retrive transactions",
        });
      }
    })
    .catch((err) => {
      console.log("Error in reissuing book \n." + err);
      console.groupEnd();
      res.status(400).send({ status: "Error in reissuing book. \n" + err });
    });
});

module.exports = router;

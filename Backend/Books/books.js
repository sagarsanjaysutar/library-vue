const express = require("express");
const router = express.Router();
const { bookModel, userModel, issueReturnInfo } = require("../models/models");
const fineAmount = 10;

function checkPenalty(dueDate, today) {
  var overDueDays = today.getDate() - dueDate.getDate();
  if (overDueDays > 0) {
    var totalFine = overDueDays * fineAmount;
    return {
      overDueDays,
      totalFine,
    };
  } else {
    overDueDays = 0;
    totalFine = 0;
    return {
      overDueDays,
      totalFine,
    };
  }
}

router.get("/getBooks", (req, res) => {
  const getNewBooks = req.query.getNewBooks;
  const searchedTerm = req.query.searchedTerm;
  if (getNewBooks) {
    console.log("Searching for new books.");
    const newBooks = bookModel.find().limit(4);
    newBooks
      .then((result) => {
        if (result) {
          console.log("Found " + result.length + " new books.");
          res.send(result);
        } else {
          console.log("No new books found!!");
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log("Error in fetching new books. \n -- " + err);
      });
  } else if (searchedTerm != "" || !searchedTerm != undefined) {
    console.log("Searching book " + searchedTerm + " in db.");
    const searchedBooks = bookModel
      .find({
        $or: [
          { name: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
          { author: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
          { genere: { $regex: ".*" + searchedTerm + ".*", $options: "i" } },
        ],
      })
      .exec();

    searchedBooks
      .then((result) => {
        if (result) {
          console.log(
            "Found " + result.length + " containing term " + searchedTerm
          );
          res.send(result);
        } else {
          console.log(result + " not found!!");
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.log("Error in finding searched book. \n -- " + err);
      });
  } else {
    res.status(406).send({
      status: "Error in fetching books. \n" + err,
    });
  }
});

router.post("/add-books", (req, res) => {
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

router.post("/issue-book", (req, res) => {
  const issuedBookDetails = req.body;
  const id = mongoose.Types.ObjectId(issuedBookDetails.issuedBook);
  //Check if book exist in bookModel collection and whether it can be issued.
  bookModel
    .countDocuments({
      $and: [
        {
          _id: id,
        },
        {
          isIssued: false,
        },
      ],
    })
    .then((count) => {
      if (count > 0) {
        //If yes, then add the details in issueReturn collection.
        issuedBookDetails.issuedOn = new Date();
        issuedBookDetails.dueDate = issuedBookDetails.issuedOn.setDate(
          issuedBookDetails.issuedOn.getDate() + 7
        );
        issueReturnInfo
          .insertMany(issuedBookDetails)
          .then(() => {
            res.status(200).send({
              status: "Book issued successfully.",
            });
          })
          .catch((err) => {
            res.status(406).send({
              status: "Failed to issue book.\n" + err,
            });
          });
        //Update the isIssued key in bookModel
        bookModel
          .updateOne(
            {
              _id: issuedBookDetails.issuedBook,
            },
            {
              $set: {
                isIssued: true,
              },
            }
          )
          .then(() => {
            console.log(
              "Book details updated for " + issuedBookDetails.issuedBook
            );
          })
          .catch(() => {
            res.status(406).send({
              status: "Failed to update book info.\n" + err,
            });
          });
      } else {
        throw new Error("Book already issued. " + count);
      }
    })
    .catch((err) => {
      res.status(406).send({
        status: "Book not found or \n" + err,
      });
    });
});

router.post("/return-book", (req, res) => {
  const returnedBook = req.body;
  //Check if the book is in the issueReturnInfo
  issueReturnInfo
    .countDocuments({
      $and: [
        {
          issuedBook: mongoose.Types.ObjectId(returnedBook.issuedBook),
        },
        {
          returnedOn: null,
        },
      ],
    })
    .then((count) => {
      if (count > 0) {
        //To check the dueDate, penalties, overdues, etc. We first find the record and insert routerropiate values
        issueReturnInfo
          .find({
            issuedBook: mongoose.Types.ObjectId(returnedBook.issuedBook),
          })
          .then((response) => {
            var issueReturnInfo_record = response;
            var today = new Date();
            //today.setDate(today.getDate() + 11) //Uncomment this to see add penalty.
            var { overDueDays, totalFine } = checkPenalty(
              issueReturnInfo_record[0].dueDate,
              today
            );
            var penalityPaidStatus = overDueDays == 0 ? true : false;
            //If fine is paid then only update the values and return the book.
            if (penalityPaidStatus) {
              issueReturnInfo
                .update(
                  {
                    $and: [
                      {
                        issuedBook: mongoose.Types.ObjectId(
                          returnedBook.issuedBook
                        ),
                      },
                      {
                        returnedOn: null,
                      },
                    ],
                  },
                  {
                    $set: {
                      returnedTo: returnedBook.returnedTo,
                      returnedOn: today,
                      overDueDays: overDueDays,
                      penalityAmount: totalFine,
                      penalityPaidStatus: penalityPaidStatus,
                    },
                  }
                )
                .then(() => {
                  res.status(200).send({
                    status: "Book returned.",
                  });
                })
                .catch((err) => {
                  res.status(406).send({
                    status: "Failed to return the book. " + err,
                  });
                });

              bookModel.update(
                {
                  _id: returnedBook.issuedBook,
                },
                {
                  $set: {
                    isIssued: false,
                  },
                }
              );
            } else {
              res.status(406).send({
                status:
                  "Pay the over due payment of " +
                  totalFine +
                  "rps for " +
                  overDueDays +
                  " days.",
              });
            }
          });
      } else {
        throw new Error("--" + count);
      }
    })
    .catch((err) => {
      res.status(406).send({
        status: "Book has not be issued. \n" + err,
      });
    });
});

module.exports = router;

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/library", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(function () {
        console.log("Connected to DB successfully.");
    })
    .catch(function (err) {
        console.log("Connection failed");
    });

const issuedBooksScehma = new mongoose.Schema({
    issuedOn: Date,
    issuedTo: String,
    issuedBook: String,
    issuedBy: String,
    dueDate: Date
});

const returnedBooksScehma = new mongoose.Schema({
    returnedOn: Date,
    returnedTo: String,
    returnedBook: String,
    returnedBy: String
});

const reservedBooksScehma = new mongoose.Schema({
    reservedOn: Date,
    reservedBook: String,
    reservedBy: String,
});

const penalitysScehma = new mongoose.Schema({
    isPenalised: Boolean,
    penalityTo: String,
    penalityOf: Number,
    penalityOn: Date,
    penalityCollectedBy: String,
    penalityOverDueDays: Number
});

const booksScehma = new mongoose.Schema({
    name: String,
    author: String,
    coverPage: String,
    genere: String,
    isIssued: Boolean,
    isReturned: Boolean,
    isReserved: Boolean,
    quantity: Number
});

const usersScehma = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    type: String
});



const issuedBooks = mongoose.model("issuedBooksModel", issuedBooksScehma);
const returnedBook = mongoose.model("returnedBookModel", returnedBooksScehma);
const reservedBook = mongoose.model("reservedBookModel", reservedBooksScehma);
const penality = mongoose.model("penalityModel", penalitysScehma);
const userModel = mongoose.model("userModel", usersScehma);
const bookModel = mongoose.model("bookmodel", booksScehma);


module.exports = {
    issuedBooks,
    returnedBook,
    userModel,
    penality,
    reservedBook,
    bookModel,

}








//Old Scehma
// const book = new mongoose.Schema({
//     bookName: String,
//     bookAuthor: String,
//     bookCoverPage: String,
//     reserveDetails: [{
//         isReserved: Boolean,
//         reservedOn: Date,
//         reservedBy: String
//     }],
//     issueDetails: [{
//         isIssued: Boolean,
//         issueDate: Date,
//         issuedTo: String,
//         issueDueDate: Date,
//         issuedBy: String
//     }],
//     returnDetails: [{
//         hasReturned: Boolean,
//         returnedOn: Date,
//         returnedBy: String,
//         accepedBy: String
//     }],
//     penalityDetails: [{
//         penalityTo: String,
//         hasPaid: Boolean,
//         fine: Number,
//         penalityOn: Date
//     }]
// });

// const user = new mongoose.Schema({
//     userFirstName: String,
//     userLastName: String,
//     booksReserved: [{
//         reservedOn: Date,
//         reservedBook: String
//     }],
//     booksIssued: [{
//         issuedOn: Date,
//         issuedBook: String,
//         dueDate: Date,
//         issuedBy: String
//     }],
//     penality: [{

//         overDue: Number,
//         fine: Number,
//         bookId: String,
//         hasPaid: Boolean
//     }]
// });

// const employee = new mongoose.Schema({
//     userFirstName: String,
//     userLastName: String,
//     issuedBooks: [{
//         issuedOn: Date,
//         issuedTo: String,
//         issuedBook: String,
//     }],
//     recievedDetails: [{
//         recievedOn: Date,
//         givenBy: String,
//         recievedBook: String
//     }]
// });
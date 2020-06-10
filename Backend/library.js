const express = require("express")

const app = express()
const port = "9090"
const bodyParser = require("body-parser")
const {
    bookModel,
    userModel
} = require("./models/models")

//app.use(express.urlencoded = true)
app.use(bodyParser.json())
app.get("/get-searched-book", (
    req, res) => {

    const searchedTerm = req.query.name
    console.log("Searching book " + searchedTerm + " in db.")
    const searchedBooks = bookModel.find({
        $or: [{
                name: searchedTerm
            },
            {
                author: searchedTerm
            },
            {
                genere: searchedTerm
            }
        ]
    }).exec()

    searchedBooks.then(result => {
        if (result) {
            console.log("Found " + result.length + " containing term " + searchedTerm)
            res.send(result)
        } else {
            console.log(result + " not found!!")
            res.sendStatus(404)
        }

    }).catch(err => {
        console.log("Erro in finding searched book \n -- " + err)
    })
})

app.post("/add-books", (req, res) => {

    var booksArr = Array();
    booksArr = req.body;
    booksArr.forEach(book => {
        if (book.name) {
            var {
                name,
                author,
                coverPage,
                genere,
                isIssued,
                isReserved,
                quantity
            } = book;


            var newBook = {
                name: name,
                author: author,
                coverPage: coverPage,
                genere: genere,
                isIssued: isIssued,
                isReserved: isReserved,
                quantity: quantity
            }

            bookModel.insertMany(newBook).then(response => {
                console.log(newBook.name + " added successfully.")
                res.status(200).send({
                    status: newBook.name + " added successfully."
                })
            }).catch(err => {
                console.log("Error in adding book \n --" + err)
                res.status(404).send({
                    status: "Error in adding book \n --" + err
                })
            })
        } else {
            console.log("Invalid Data")
            res.status(403).send({
                status: "Invalid Data."
            })
        }

    })


})

app.post("/add-user", (req, res) => {
    var userArr = Array();
    userArr = req.body;
    userArr.forEach(user => {
        if (user.firstName) {
            var {
                firstName,
                lastName,
                email,
                password,
                type
            } = user;

            var newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                type: type
            }

            switch(type){
                case "admin":
                    userModel.createU
                    break;
                case "student":
                    break;
                case "employee":
                    break;
                default:
                    console.log("Invalid user.")
                    res.status(403).send({status:"Invalid user."})
                
            }



        }
    })

})

app.post("/issue-book", (req, res) => {

})





app.listen(port, () => {
    console.log("Library server running on port " + port)
})
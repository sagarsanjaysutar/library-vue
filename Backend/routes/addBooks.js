const mongoose = require('mongoose');
const model = require('../models/models');

var book = new model.bookModel({
    bookName: 'UI',
    bookAuthor: 'miri',
});


book.save().then(function () {
    console.log(book.bookName + " added successfully in " + "bookModel collection.");
}).catch(function (err) {
    console.log("Error in adding books." + err);
});
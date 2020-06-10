const {
    bookModel
} = require("./models/models")
var allBooks = Array()
bookModel.find({}).then(results => {

    // if (result.name == null) {
    //     bookModel.remove({
    //         result
    //     })
    // }
    results.forEach(result => {

        if (result.name == null) {
            var e = result.name
            console.log(result.name)
            bookModel.deleteMany({
                result
            }).then(ress => {
                console.log(ress + " deleted");
            }).catch(err => {
                console.log("Error in deleting.")
            })

        }
    })

}).catch(err => {
    console.log("Error in fetching" + err)
})
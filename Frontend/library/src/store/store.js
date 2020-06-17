import vue from "vue"
import vuex from "vuex"
import {
    get,
} from 'axios';

const url = 'http://localhost:9090';

vue.use(vuex);



export const store = new vuex.Store({
    state: {
        books: [{
                name: "UI",
                author: "Miri",
                coverPage: "D:\\Main\\Work\\Project\\Library\\Backend\\assests\\img\\a.jpg",
                genere: "IT",
                isIssued: true,
                isReserved: false,
                quantity: 3
            },
            {
                name: "Machine Learning",
                author: "Harsh",
                coverPage: "D:\\Main\\Work\\Project\\Library\\Backend\\assests\\img\\c.jpg",
                genere: "IT",
                isIssued: false,
                isReserved: true,
                quantity: 5
            },
            {
                name: "Cyber",
                author: "Vineet",
                coverPage: "D:\\Main\\Work\\Project\\Library\\Backend\\assests\\img\\b.png",
                genere: "IT",
                isIssued: false,
                isReserved: false,
                quantity: 10
            },
            {
                name: "IOT",
                author: "Sagar",
                coverPage: "D:\\Main\\Work\\Project\\Library\\Backend\\assests\\img\\a.jpg",
                genere: "IT",
                isIssued: true,
                isReserved: true,
                quantity: 1
            }
        ],
        searchedBooks: [],
        newBooks: []
    },
    actions: {
        async fetchBooks(context, {
            searchedTerm,
            getNewBooks
        }) {
            console.log("fetchBook parameter :- " + getNewBooks + ", " + searchedTerm)
            if (getNewBooks) {
                await get(`${url}/getBooks`, {
                    params: {
                        "getNewBooks": true
                    }
                }).then(resp => {
                    console.log("Successfully got " + resp.data.length + " new books.")
                    this.state.newBooks = resp.data
                }).catch(err => {
                    console.log("Error in fetching searched books. \n-" + err)
                })

            } else {
                await get(`${url}/getBooks`, {
                    params: {
                        "searchedTerm": searchedTerm
                    }
                }).then(resp => {
                    console.log("Successfully found " + resp.data.length + " books with search keyword : " + searchedTerm + ".")
                    this.state.searchedBooks = resp.data
                }).catch(err => {
                    console.log("Error in fetching searched books. \n-" + err)
                })
            }
        }
    }
});

// const booksScehma = new mongoose.Schema({
//     name: String,
//     author: String,
//     coverPage: String,
//     isIssued: Boolean,
//     isReturned: Boolean,
//     isReserved: Boolean,
//     quantity: Number
// });
import vue from "vue"
import vuex from "vuex"

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
                name: "ML",
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
        ]
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
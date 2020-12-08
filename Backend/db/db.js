const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/library", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Connected to DB successfully.");
  })
  .catch(function (err) {
    console.log("Connection failed");
  });

const booksScehma = new mongoose.Schema({
  b_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  coverPage: { type: String, required: true },
  location: { type: String, required: true },
  genere: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  description: { type: String },
  issuedQuantity: Number,
});

const usersScehma = new mongoose.Schema({
  u_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  issuedBookQuantiy: Number,
});

const issueReturnInfoSchema = new mongoose.Schema({
  t_id: String,
  issuedOn: Date,
  issuedTo: String,
  issuedBook: String,
  issuedBy: String,
  dueDate: Date,
  dueDateExtensionNumber: Number,
  returnedOn: Date,
  returnedTo: String,
  overDueDays: Number,
  penalityAmount: Number,
  penalityPaidStatus: Boolean,
});

const userModel = mongoose.model("userModel", usersScehma);
const bookModel = mongoose.model("bookmodel", booksScehma);
const issueReturnInfo = mongoose.model("issueReturnInfo", issueReturnInfoSchema);

module.exports = {
  userModel,
  bookModel,
  issueReturnInfo,
};

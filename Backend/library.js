const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./Authentication/auth");
const books = require("./Books/books");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: ["http://localhost:8080", "http://localhost:8081"] }));

const port = "9090";

app.use(authRoute);
app.use(books);

app.listen(port, () => {
  console.log("Library server running on port " + port);
});

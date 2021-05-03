const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// setup express server
// server listens for incoming requests
// runs a function based on request and sends back answer
const app = express();

// parse to json
app.use(express.json());

// set express to listen on port 5000
// will be undoing hard coding later
app.listen(5000, () => console.log("Server started on port: 5000"));

// set up routers
app.use("/snippet", require("./routers/snippetRouter"));

// Set up MongoDB
mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);


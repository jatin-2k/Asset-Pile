require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
// const bodyParser = require("body-parser");

//cconnections
mongoose
  .connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB GOT OOPS...");
  });

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//midlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//ALL routes will start with /api/nameofroutes

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`App is running on the port ${port}`);
});

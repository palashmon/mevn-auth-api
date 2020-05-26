const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const apiRouter = require("./routes/api");
require("dotenv").config();

// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(bodyParser.urlencoded({
  extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, "public")));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
//require('./config/passport')(passport);

// Bring in the Database Config and connect with the database
const db = process.env.MONGODB_URL;
mongoose.connect(db, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(() => {
  console.log("Database connected successfully");
}).catch(err => {
  console.log(`Unable to connect with the database ${err}`);
  process.exit(1);
});

//Route Prefixes
app.use("/api/", apiRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

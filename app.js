const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const apiRouter = require("./routes/api");
require("dotenv").config();

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

// Initialize the app
const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, "public")));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require("./config/passport")(passport);

// Bring in the Database Config and connect with the database
const db = process.env.MONGODB_URL;
mongoose.connect(db, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
}).then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.log(`Unable to connect with the database ${err}`);
  process.exit(1);
});

// Route Prefixes
app.use("/api/", apiRouter);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


// Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

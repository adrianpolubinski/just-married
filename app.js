require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "public/index.html");

app.use(express.static(DIST_DIR));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/mainPageRoutes.js");

let gfs;

app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});

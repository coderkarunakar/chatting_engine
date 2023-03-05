const mongoose = require("mongoose");
const db = mongoose.connection;
// Connecting to database
mongoose.connect(
"mongodb://localhost:27017/",
{
	dbName: "social_authentication",
	useNewUrlParser: true,
	useUnifiedTopology: true,
},
(err) =>
	err ? console.log(err) : console.log(
	"Connected to social_authentication database")
);
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 8000");
module.exports=db;
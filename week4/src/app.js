const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors: celebrateErrors } = require("celebrate");

const blogsRouter = require("./controllers/blogs");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogsRouter);

app.use(celebrateErrors());

module.exports = app;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const blogsRouter = require("./controllers/blogs");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;

const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogs");

app.use(cors());
app.use(bodyParser.json());

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

app.use("/api/blogs", blogsRouter);

const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

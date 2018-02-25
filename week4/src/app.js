const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { errors: celebrateErrors } = require("celebrate");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(celebrateErrors());

app.use((err, req, res, next) => {
  if (err.name !== "UnauthorizedError") {
    return next(err);
  }
  return res.status(401).json({ error: "token missing or invalid" });
});

module.exports = app;

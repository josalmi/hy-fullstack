const mongoose = require("mongoose");

const Blog = mongoose.model("Blog", {
  title: String,
  author: String,
  url: String,
  likes: Number
});

const userSchema = new mongoose.Schema(
  {
    username: String,
    passwordHash: String,
    name: String,
    adult: Boolean
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { Blog, User };

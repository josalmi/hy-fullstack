const mongoose = require("mongoose");

const Blog = mongoose.model("Blog", {
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    passwordHash: String,
    name: String,
    adult: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }]
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

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let port = process.env.PORT;
let mongoUrl = process.env.MONGODB_URI;
let testMongoUrl = process.env.TEST_MONGODB_URI;
let secret = process.env.SECRET;

module.exports = {
  mongoUrl,
  testMongoUrl,
  port,
  secret
};

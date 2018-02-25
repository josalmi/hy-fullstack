const router = require("express-promise-router")();
const { celebrate, Joi } = require("celebrate");
const bcrypt = require("bcryptjs");

const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { user: false });
  res.json(users);
});

router.post(
  "/",
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      name: Joi.string(),
      password: Joi.string()
        .min(3)
        .required(),
      adult: Joi.boolean().default(true)
    })
  }),
  async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    try {
      const user = await new User({
        ...req.body,
        passwordHash
      }).save();
      res.status(201).json(user);
    } catch (err) {
      if (err.name !== "BulkWriteError" || err.code !== 11000) {
        throw err;
      }
      return res.status(400).json({
        statusCode: 400,
        error: "Bad Request",
        message: `Username "${req.body.username}" is not available`
      });
    }
  }
);

module.exports = router;

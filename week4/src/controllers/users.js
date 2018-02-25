const router = require("express-promise-router")();
const { celebrate, Joi } = require("celebrate");
const bcrypt = require("bcryptjs");

const { User } = require("../models");

router.get("/", async (req, res) => {
  res.json(await User.find({}));
});

router.post(
  "/",
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      name: Joi.string(),
      password: Joi.string().required(),
      adult: Joi.boolean()
    })
  }),
  async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      ...req.body,
      passwordHash
    }).save();
    res.status(201).json(user);
  }
);

module.exports = router;

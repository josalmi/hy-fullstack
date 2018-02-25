const router = require("express-promise-router")();
const { celebrate, Joi } = require("celebrate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models");

router.post(
  "/",
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.findOne({ username: req.body.username });
    if (
      user === null ||
      !await bcrypt.compare(req.body.password, user.passwordHash)
    ) {
      return res.status(401).json({
        error: "invalid username or password"
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
  }
);

module.exports = router;

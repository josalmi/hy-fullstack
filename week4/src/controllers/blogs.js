const router = require("express-promise-router")();
const { celebrate, Joi } = require("celebrate");

const { Blog } = require("../models");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post(
  "/",
  celebrate({
    body: Joi.object({
      title: Joi.string(),
      author: Joi.string(),
      url: Joi.string(),
      likes: Joi.number()
        .integer()
        .min(0)
        .default(0)
    })
  }),
  async (request, response) => {
    const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(201).json(result);
  }
);

module.exports = router;

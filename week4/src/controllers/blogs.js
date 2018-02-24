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
      title: Joi.string().required(),
      author: Joi.string(),
      url: Joi.string().required(),
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

router.delete(
  "/:id",
  celebrate({
    params: Joi.object({
      id: Joi.string()
        .length(24)
        .hex(9)
    })
  }),
  async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  }
);

module.exports = router;

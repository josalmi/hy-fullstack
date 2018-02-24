const router = require("express-promise-router")();
const { celebrate, Joi } = require("celebrate");

const { Blog } = require("../models");

const blogSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string(),
  url: Joi.string().required(),
  likes: Joi.number()
    .integer()
    .min(0)
    .default(0)
});
const objectIdSchema = Joi.string()
  .length(24)
  .hex();

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.post(
  "/",
  celebrate({
    body: blogSchema
  }),
  async (req, res) => {
    const blog = new Blog(req.body);

    const result = await blog.save();
    res.status(201).json(result);
  }
);

router.put(
  "/:id",
  celebrate(
    {
      body: blogSchema,
      params: Joi.object({
        id: objectIdSchema
      })
    },
    {
      stripUnknown: true
    }
  ),
  async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(blog);
  }
);

router.delete(
  "/:id",
  celebrate({
    params: Joi.object({
      id: objectIdSchema
    })
  }),
  async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  }
);

module.exports = router;

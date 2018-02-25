const router = require("express-promise-router")();
const { celebrate, Joi } = require("celebrate");

const jwtMiddleware = require("./middleware/jwt");
const { Blog, User } = require("../models");

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
  const blogs = await Blog.find({}).populate("user", {
    username: true,
    name: true
  });
  res.json(blogs);
});

router.post(
  "/",
  jwtMiddleware,
  celebrate({
    body: blogSchema
  }),
  async (req, res) => {
    const user = await User.findById(req.user.id);

    const blog = await new Blog({
      ...req.body,
      user: user._id
    }).save();

    user.blogs = [...user.blogs, blog._id];
    await user.save();

    res.status(201).json(blog);
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
  jwtMiddleware,
  celebrate({
    params: Joi.object({
      id: objectIdSchema
    })
  }),
  async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.sendStatus(204);
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only blog owner can delete blog"
      });
    }
    await blog.remove();
    res.sendStatus(204);
  }
);

module.exports = router;

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./app");
const config = require("./config");
const { Blog } = require("./models");

const request = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
];

const getBlogs = (query = {}) => Blog.find(query).lean();

beforeAll(async () => {
  await mongoose.connect(config.testMongoUrl);
});

beforeEach(async () => {
  await Blog.remove({});
  for (blog of initialBlogs) {
    await new Blog(blog).save();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/blogs", () => {
  test("has length of initial blogs", async () => {
    const response = await request.get("/api/blogs").expect(200);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blog elements have all the fields", async () => {
    const response = await request.get("/api/blogs").expect(200);
    for (blog of initialBlogs) {
      expect(response.body).toContainEqual({
        ...blog,
        _id: expect.any(String),
        __v: 0
      });
    }
  });
});

describe("POST /api/blogs", () => {
  const blog = {
    title: "Hello world",
    author: "Foo Bar",
    url: "http://example.com",
    likes: 3
  };

  test("valid blog is added", async () => {
    await request
      .post("/api/blogs")
      .send(blog)
      .expect(201);
    const blogs = await getBlogs();
    expect(blogs).toHaveLength(initialBlogs.length + 1);
    expect(blogs).toContainEqual(expect.objectContaining(blog));
  });

  test("likes defaults to 0", async () => {
    await request
      .post("/api/blogs")
      .send({
        ...blog,
        likes: undefined
      })
      .expect(201);
    const blogs = await getBlogs();
    expect(blogs).toContainEqual(
      expect.objectContaining({
        ...blog,
        likes: 0
      })
    );
  });

  test("title is required", async () => {
    await request
      .post("/api/blogs")
      .send({
        ...blog,
        title: undefined
      })
      .expect(400);
  });

  test("url is required", async () => {
    await request
      .post("/api/blogs")
      .send({
        ...blog,
        url: undefined
      })
      .expect(400);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("likes is updated", async () => {
    const [blog] = await getBlogs();
    const blogUpdate = {
      ...blog,
      likes: 1337
    };
    const response = await request
      .put(`/api/blogs/${blog._id}`)
      .send(blogUpdate)
      .expect(200);
    expect(response.body).toEqual({
      ...blogUpdate,
      _id: blogUpdate._id.toString()
    });
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("blog is removed", async () => {
    const blogsBeforeRemove = await getBlogs();
    const blogToRemove = blogsBeforeRemove[0];
    await request.delete(`/api/blogs/${blogToRemove._id}`).expect(204);

    const blogsAfterRemove = await getBlogs();
    expect(blogsAfterRemove).toHaveLength(blogsBeforeRemove.length - 1);
    expect(blogsAfterRemove).not.toContainEqual(blogToRemove);
  });
});

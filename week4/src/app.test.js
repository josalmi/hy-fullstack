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

beforeAll(async () => {
  await mongoose.connect(config.testMongoUrl);
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
    const response = await request.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(response.body).toContainEqual(expect.objectContaining(blog));
  });
});

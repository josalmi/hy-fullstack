const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./app");
const config = require("./config");
const { Blog, User } = require("./models");

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.testMongoUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/blogs", () => {
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

  beforeEach(async () => {
    await Blog.remove({});
    for (blog of initialBlogs) {
      await new Blog(blog).save();
    }
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
});
describe("/api/users", () => {
  beforeEach(async () => {
    await User.remove({});
  });

  describe("GET /api/users", () => {
    const initialUsers = [
      {
        name: "test1",
        username: "test1",
        passwordHash:
          "$2a$10$3nAnDiLHmeTLtnX.VeTBEu//v/6umOsD3XSILoH9N9CyAE/d3hGNK",
        adult: true
      },
      {
        name: "test2",
        username: "test2",
        passwordHash:
          "$2a$10$3nAnDiLHmeTLtnX.VeTBEu//v/6umOsD3XSILoH9N9CyAE/d3hGNK",
        adult: false
      }
    ];
    beforeEach(async () => {
      for (let user of initialUsers) {
        await new User(user).save();
      }
    });

    test("lists all users", async () => {
      const response = await request.get("/api/users").expect(200);
      initialUsers.map(({ passwordHash, ...user }) => {
        expect(response.body).toContainEqual(expect.objectContaining(user));
      });
    });

    test("passwordHash is not included", async () => {
      const response = await request.get("/api/users").expect(200);
      expect(response.body).not.toContainEqual(
        expect.objectContaining({
          passwordHash: expect.anything()
        })
      );
    });
  });

  describe("POST /api/users", () => {
    const user = {
      username: "test",
      password: "P@s",
      name: "doge is love doge is life",
      adult: false
    };
    test("creates user", async () => {
      const response = await request
        .post("/api/users")
        .send(user)
        .expect(201);
      const { password, ...userWithoutPasword } = user;
      expect(response.body).toEqual(
        expect.objectContaining(userWithoutPasword)
      );
    });

    test("username required to be unique", async () => {
      await request
        .post("/api/users")
        .send(user)
        .expect(201);
      const response = await request
        .post("/api/users")
        .send(user)
        .expect(400);
      expect(response.body).toMatchSnapshot();
    });

    test("password min length is ensured", async () => {
      const response = await request
        .post("/api/users")
        .send({
          ...user,
          password: ":("
        })
        .expect(400);
      expect(response.body).toMatchSnapshot();
    });

    test("adult defaults to true", async () => {
      const response = await request
        .post("/api/users")
        .send({
          ...user,
          adult: undefined
        })
        .expect(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          adult: true
        })
      );
    });
  });
});

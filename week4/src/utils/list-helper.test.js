const listHelper = require("./list-helper");

test("dummy is called", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

import React from "react";
import { shallow } from "enzyme";
import SimpleBlog from "./SimpleBlog";

// Tee testi, joka varmistaa, että komponentti renderöi blogin titlen,
// authorin ja likejen määrän.
const blog = {
  title: "Komponenttitestaus tapahtuu jestillä ja enzymellä",
  author: "Luke",
  likes: 5
};

it("renders title", () => {
  const blogComponent = shallow(<SimpleBlog blog={blog} />);
  expect(blogComponent).toIncludeText(blog.title);
});

it("renders author", () => {
  const blogComponent = shallow(<SimpleBlog blog={blog} />);
  expect(blogComponent).toIncludeText(blog.author);
});

it("renders likes", () => {
  const blogComponent = shallow(<SimpleBlog blog={blog} />);
  expect(blogComponent).toIncludeText(`${blog.likes} likes`);
});

it("calls onClick when like button is clicked", () => {
  const onClickListener = jest.fn();
  const blogComponent = shallow(
    <SimpleBlog blog={blog} onClick={onClickListener} />
  );
  const likeButton = blogComponent.find("button");
  likeButton.simulate("click");
  likeButton.simulate("click");
  expect(onClickListener).toHaveBeenCalledTimes(2);
});

import React from "react";
import { shallow } from "enzyme";
import Blog from "./Blog";

// Tee testi, joka varmistaa, että komponentti renderöi blogin titlen,
// authorin ja likejen määrän.
const blog = {
  title: "Komponenttitestaus tapahtuu jestillä ja enzymellä",
  author: "Luke",
  likes: 5,
  url: "http://example.com/luke/",
  user: {
    name: "Doge"
  }
};

it("renders only title and author beDefault", () => {
  const blogComponent = shallow(<Blog blog={blog} />);
  expect(blogComponent).toHaveText(`${blog.title} ${blog.author}`);
});

it("calls details toggle on author click", () => {
  const detailsToggleListener = jest.fn();
  const blogComponent = shallow(
    <Blog blog={blog} onDetailsToggle={detailsToggleListener} />
  );
  const wrapper = blogComponent.children();
  wrapper.simulate("click");
  expect(detailsToggleListener).toHaveBeenCalledTimes(1);
});

it("renders additional details when open", () => {
  const blogComponent = shallow(<Blog blog={{ ...blog, open: true }} />);

  const linkToBlog = blogComponent.find("a");
  expect(linkToBlog).toHaveProp("href", blog.url);
  expect(linkToBlog).toHaveText(blog.url);

  expect(blogComponent).toIncludeText(`${blog.likes} likes`);
  expect(blogComponent).toIncludeText(`added by ${blog.user.name}`);
});

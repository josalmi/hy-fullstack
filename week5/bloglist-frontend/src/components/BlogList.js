import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, onBlogClick }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog => (
      <Blog key={blog._id} blog={blog} onClick={onBlogClick} />
    ))}
  </div>
);

export default BlogList;

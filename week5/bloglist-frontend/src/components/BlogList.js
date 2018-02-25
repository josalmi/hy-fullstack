import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, onBlogDetailsToggle, onBlogLike }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog => (
      <Blog
        key={blog._id}
        blog={blog}
        onDetailsToggle={onBlogDetailsToggle}
        onLike={onBlogLike}
      />
    ))}
  </div>
);

export default BlogList;

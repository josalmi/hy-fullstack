import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, onBlogDetailsToggle, onBlogLike, onBlogDelete }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog => (
      <Blog
        key={blog._id}
        blog={blog}
        onDetailsToggle={onBlogDetailsToggle}
        onLike={onBlogLike}
        onDelete={onBlogDelete}
      />
    ))}
  </div>
);

export default BlogList;

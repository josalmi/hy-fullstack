import React from "react";

const BlogForm = ({ onSubmit, formState, onInputChange }) => (
  <form onSubmit={onSubmit}>
    <h2>create new</h2>
    <div>
      title{" "}
      <input name="title" onChange={onInputChange} value={formState.title} />
    </div>
    <div>
      author{" "}
      <input name="author" onChange={onInputChange} value={formState.author} />
    </div>
    <div>
      url <input name="url" onChange={onInputChange} value={formState.url} />
    </div>
    <button>create</button>
  </form>
);

export default BlogForm;

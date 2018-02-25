import React from "react";
class Blog extends React.PureComponent {
  handleDetailsToggle = () => {
    this.props.onDetailsToggle(this.props.blog._id);
  };

  handleLike = () => {
    this.props.onLike(this.props.blog);
  };

  render() {
    const { blog } = this.props;
    return (
      <div
        style={{ border: "1px solid #efefef", padding: "5px", margin: "5px" }}
      >
        <div onClick={this.handleDetailsToggle}>
          {blog.title} {blog.author}
        </div>
        {blog.open && (
          <div style={{ padding: "5px" }}>
            <div>
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              {blog.likes} likes{" "}
              <button type="button" onClick={this.handleLike}>
                like
              </button>
            </div>
            <div>added by {blog.user.name}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Blog;

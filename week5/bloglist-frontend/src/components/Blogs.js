import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { Segment, Header, List, Form, Button } from "semantic-ui-react";
import {
  getBlogs,
  like,
  createBlog,
  comment,
  blogFormInputChange
} from "../ducks/blogs";
import { notify } from "../ducks/notifications";

class Blogs extends React.PureComponent {
  componentDidMount() {
    this.props.getBlogs();
  }

  render() {
    return (
      <Switch>
        <Route
          path="/blogs/create"
          render={({ history }) => (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                await this.props.createBlog(this.props.form);
                this.props.notify("Blog created", 5000);
                history.push("/");
              }}
            >
              <Form.Field>
                <label>Title</label>
                <input
                  name="title"
                  placeholder="Title"
                  onChange={this.props.blogFormInputChange}
                  value={this.props.form.title}
                />
              </Form.Field>
              <Form.Field>
                <label>Author</label>
                <input
                  name="author"
                  placeholder="Author"
                  onChange={this.props.blogFormInputChange}
                  value={this.props.form.author}
                />
              </Form.Field>
              <Form.Field>
                <label>URL</label>
                <input
                  name="url"
                  placeholder="URL"
                  onChange={this.props.blogFormInputChange}
                  value={this.props.form.url}
                />
              </Form.Field>
              <Form.Button type="submit">Create</Form.Button>
            </Form>
          )}
        />
        <Route
          path="/blogs/:id"
          render={({ match: { params: { id } } }) => {
            const blog = this.props.blogs.find(blog => blog._id === id);
            if (!blog) return null;
            return (
              <React.Fragment>
                <Header as="h1">
                  {blog.title} ({blog.author})
                </Header>
                <div>
                  <a href={blog.url}>{blog.url}</a>
                </div>
                <div>
                  {blog.likes} likes{" "}
                  <Button size="mini" onClick={() => this.props.like(blog)}>
                    Like
                  </Button>
                </div>
                <div>added by {blog.user.name}</div>
                <Segment vertical>
                  <Header as="h2">Comments</Header>
                  <List>
                    {blog.comments.map((comment, i) => (
                      <List.Item key={i} content={comment} />
                    ))}
                  </List>
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      this.props.comment(blog._id, this.input.value);
                    }}
                  >
                    <Form.Group>
                      <input
                        name="comment"
                        placeholder="Comment"
                        ref={i => {
                          this.input = i;
                        }}
                      />
                      <Form.Button>Comment</Form.Button>
                    </Form.Group>
                  </Form>
                </Segment>
              </React.Fragment>
            );
          }}
        />
        <Route
          render={() => (
            <React.Fragment>
              <Header as="h1">Blogs</Header>
              <List>
                {this.props.blogs.map(blog => (
                  <List.Item
                    as={Link}
                    key={blog._id}
                    header={blog.title}
                    content={blog.author}
                    to={`/blogs/${blog._id}`}
                  />
                ))}
              </List>
              <Link to="/blogs/create">Create new</Link>
            </React.Fragment>
          )}
        />
      </Switch>
    );
  }
}

export default connect(({ blogs: { blogs, form } }) => ({ blogs, form }), {
  getBlogs,
  like,
  createBlog,
  comment,
  blogFormInputChange,
  notify
})(Blogs);

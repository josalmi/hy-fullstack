import React from "react";
import Login from "./Login";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import loginService from "../services/login";

class App extends React.Component {
  state = {
    user: null,
    blogs: [],
    loginForm: {
      username: "",
      password: ""
    },
    blogForm: {
      title: "",
      author: "",
      url: ""
    },
    notification: null
  };

  async componentDidMount() {
    const blogs = await blogService.getAll();
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
    this.setState({ blogs });

    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState(prev => ({
        blogs: prev.blogs.map(blog => ({
          ...blog,
          canDelete: user.id === blog.user._id
        })),
        user
      }));
      blogService.setToken(user.token);
    }
  }

  handleLoginInputChange = e => {
    const { target: { name, value } } = e;
    this.setState(prev => ({
      loginForm: {
        ...prev.loginForm,
        [name]: value
      }
    }));
  };

  handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login(this.state.loginForm);
      this.setState(prev => ({
        blogs: prev.blogs.map(blog => ({
          ...blog,
          canDelete: user.id === blog.user._id
        })),
        user,
        loginForm: { username: "", password: "" }
      }));
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      this.showNotification(`Welcome ${user.name}!`);
    } catch (e) {
      this.showNotification(`wrong username or password`, false);
    }
  };

  handleLogout = () => {
    window.localStorage.clear();
    this.setState({ user: null });
    this.showNotification(`logged out`);
  };

  handleBlogInputChange = e => {
    const { target: { name, value } } = e;
    this.setState(prev => ({
      blogForm: {
        ...prev.blogForm,
        [name]: value
      }
    }));
  };

  handleCreateBlog = async e => {
    e.preventDefault();
    try {
      const blog = await blogService.create(this.state.blogForm);
      this.showNotification(
        `a new blog '${blog.title}' by ${blog.author} added`
      );
      this.setState(prev => ({
        blogs: [...prev.blogs, blog],
        blogForm: {
          title: "",
          author: "",
          url: ""
        }
      }));
    } catch (e) {
      this.showNotification(e.response.data.message, false);
    }
  };

  showNotification = (message, success = true) => {
    this.setState({
      notification: {
        message,
        success
      }
    });
    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 5000);
  };

  handleBlogDetailsToggle = _id => {
    this.setState(prev => ({
      blogs: prev.blogs.map(
        blog => (blog._id === _id ? { ...blog, open: !blog.open } : blog)
      )
    }));
  };

  handleBlogLike = async blog => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    });
    this.setState(prev => ({
      blogs: prev.blogs.map(
        blog =>
          blog._id === updatedBlog._id
            ? { ...blog, likes: updatedBlog.likes }
            : blog
      )
    }));
  };

  handleBlogDelete = async ({ _id, title, author }) => {
    if (!window.confirm(`delete '${title}' by ${author}`)) {
      return;
    }
    await blogService.remove(_id);
    this.setState(prev => ({
      blogs: prev.blogs.filter(blog => blog._id !== _id)
    }));
  };

  render() {
    if (!this.state.user) {
      return (
        <div>
          {this.state.notification && (
            <Notification {...this.state.notification} />
          )}
          <Login
            formState={this.state.loginForm}
            onInputChange={this.handleLoginInputChange}
            onLogin={this.handleLogin}
          />
        </div>
      );
    }
    return (
      <div>
        {this.state.notification && (
          <Notification {...this.state.notification} />
        )}
        {this.state.user.name} logged in{" "}
        <button onClick={this.handleLogout}>logout</button>
        <BlogList
          blogs={this.state.blogs}
          onBlogDetailsToggle={this.handleBlogDetailsToggle}
          onBlogLike={this.handleBlogLike}
          onBlogDelete={this.handleBlogDelete}
        />
        <Togglable showLabel="show create blog" hideLabel="hide create blog">
          <BlogForm
            onSubmit={this.handleCreateBlog}
            onInputChange={this.handleBlogInputChange}
            formState={this.state.blogForm}
          />
        </Togglable>
      </div>
    );
  }
}

export default App;
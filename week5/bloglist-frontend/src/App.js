import React from "react";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
    const blogs = await blogService.getAll();
    this.setState({ blogs });
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
      this.setState({
        user,
        loginForm: { username: "", password: "" }
      });
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

  toggleBlogVisibility = _id => {
    this.setState(prev => ({
      blogs: prev.blogs.map(
        blog => (blog._id === _id ? { ...blog, open: !blog.open } : blog)
      )
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
          onBlogClick={this.toggleBlogVisibility}
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

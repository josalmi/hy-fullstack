import React from "react";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
  state = {
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
    loginError: null,
    user: null
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
    this.setState({ loginError: null });
    try {
      const user = await loginService.login(this.state.loginForm);
      this.setState({
        user,
        loginForm: { username: "", password: "" }
      });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (e) {
      this.setState({
        loginError: "käyttäjätunnus tai salasana virheellinen"
      });
    }
  };

  handleLogout = () => {
    window.localStorage.clear();
    this.setState({ user: null });
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
    const blog = await blogService.create(this.state.blogForm);
    this.setState(prev => ({
      blogs: [...prev.blogs, blog]
    }));
  };

  render() {
    if (!this.state.user) {
      return (
        <Login
          formState={this.state.loginForm}
          onInputChange={this.handleLoginInputChange}
          onLogin={this.handleLogin}
          error={this.state.loginError}
        />
      );
    }
    return (
      <div>
        {this.state.user.name} logged in{" "}
        <button onClick={this.handleLogout}>logout</button>
        <BlogList blogs={this.state.blogs} />
        <BlogForm
          onSubmit={this.handleCreateBlog}
          onInputChange={this.handleBlogInputChange}
          formState={this.state.blogForm}
        />
      </div>
    );
  }
}

export default App;

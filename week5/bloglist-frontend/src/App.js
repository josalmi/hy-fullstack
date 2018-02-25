import React from "react";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
  state = {
    blogs: [],
    loginForm: {
      username: "",
      password: ""
    },
    loginError: null,
    user: null
  };

  async componentDidMount() {
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
    } catch (e) {
      this.setState({
        loginError: "käyttäjätunnus tai salasana virheellinen"
      });
    }
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
        {this.state.user.name} logged in
        <BlogList blogs={this.state.blogs} />
      </div>
    );
  }
}

export default App;

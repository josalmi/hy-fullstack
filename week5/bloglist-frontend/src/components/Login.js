import React from "react";
import PropTypes from "prop-types";

const Login = ({ onLogin, formState, onInputChange }) => (
  <form onSubmit={onLogin}>
    <h2>Log in to application</h2>
    <div>
      username{" "}
      <input
        name="username"
        value={formState.username}
        onChange={onInputChange}
      />
    </div>
    <div>
      password{" "}
      <input
        name="password"
        type="password"
        value={formState.password}
        onChange={onInputChange}
      />
    </div>
    <button>login</button>
  </form>
);

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Login;

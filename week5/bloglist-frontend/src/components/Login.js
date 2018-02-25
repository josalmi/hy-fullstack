import React from "react";

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

export default Login;

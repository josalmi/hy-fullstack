import React from "react";

const Login = ({ onLogin, error, formState, onInputChange }) => (
  <form onSubmit={onLogin}>
    <h2>kirjaudu</h2>
    {error && <div>{error}</div>}
    <div>
      käyttäjätunnus{" "}
      <input
        name="username"
        value={formState.username}
        onChange={onInputChange}
      />
    </div>
    <div>
      salasana{" "}
      <input
        name="password"
        type="password"
        value={formState.password}
        onChange={onInputChange}
      />
    </div>
    <button type="submit">kirjaudu</button>
  </form>
);

export default Login;

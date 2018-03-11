import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { login, sessionFormInputChange } from "../ducks/sessions";
import { notify } from "../ducks/notifications";

const Login = ({ form, login, sessionFormInputChange, notify }) => (
  <Form
    onSubmit={e => {
      e.preventDefault();
      login(form);
      notify("Logged in", 5000);
    }}
  >
    <h2>Log in to application</h2>
    <Form.Field>
      <label>Username</label>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={sessionFormInputChange}
      />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={sessionFormInputChange}
      />
    </Form.Field>
    <Form.Button type="submit">login</Form.Button>
  </Form>
);

export default connect(({ sessions: { form } }) => ({ form }), {
  login,
  sessionFormInputChange,
  notify
})(Login);

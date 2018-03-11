import React from "react";
import { connect } from "react-redux";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import { Segment, Container, Menu, Icon, Message } from "semantic-ui-react";
import Login from "./Login";
import Users from "./Users";
import Blogs from "./Blogs";
import { logout } from "../ducks/sessions";

class App extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <Container>
          {this.props.notifications.map(notification => (
            <Message error content={notification} />
          ))}
          <Login />
        </Container>
      );
    }
    return (
      <Container>
        <Menu pointing secondary>
          <Menu.Item as={NavLink} exact to="/">
            Blogs
          </Menu.Item>
          <Menu.Item as={NavLink} to="/users">
            Users
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Icon name="user" /> {this.props.user.name}
            </Menu.Item>
            <Menu.Item onClick={this.props.logout}>Logout</Menu.Item>
          </Menu.Menu>
        </Menu>
        {this.props.notifications.map(notification => (
          <Message key={notification} success content={notification} />
        ))}
        <Switch>
          <Route path="/users" component={Users} />
          <Route component={Blogs} />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(
  connect(
    ({ sessions: { user }, notifications: { notifications } }) => ({
      user,
      notifications
    }),
    { logout }
  )(App)
);

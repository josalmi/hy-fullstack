import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router";
import { Container, Header, Table } from "semantic-ui-react";
import { getUsers } from "../ducks/users";

class Users extends React.PureComponent {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <Container>
        <Header as="h1">Users</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Blogs added</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default connect(({ users }) => ({ users }), { getUsers })(Users);

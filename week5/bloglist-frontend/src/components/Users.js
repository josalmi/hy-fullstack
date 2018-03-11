import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { Container, Header, Table, List } from "semantic-ui-react";
import { getUsers } from "../ducks/users";

class Users extends React.PureComponent {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <Container>
        <Route
          exact
          path="/users"
          render={() => (
            <React.Fragment>
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
                      <Table.Cell>
                        <Link to={`/users/${user._id}`}>{user.name}</Link>
                      </Table.Cell>
                      <Table.Cell>{user.blogs.length}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </React.Fragment>
          )}
        />
        <Route
          path="/users/:id"
          render={({ match: { params: { id } } }) => {
            const user = this.props.users.find(user => user._id === id);
            if (!user) return null;
            return (
              <React.Fragment>
                <Header as="h1">{user.name}</Header>

                <Header as="h2">Blogs</Header>
                <List>
                  {user.blogs.map(blog => (
                    <List.Item
                      key={blog._id}
                      header={blog.title}
                      content={blog.author}
                    />
                  ))}
                </List>
              </React.Fragment>
            );
          }}
        />
      </Container>
    );
  }
}

export default connect(({ users }) => ({ users }), { getUsers })(Users);

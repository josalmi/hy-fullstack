import React from "react";
import { Route, NavLink, Link, withRouter } from "react-router-dom";
import {
  Menu,
  Container,
  Segment,
  List,
  Grid,
  Image,
  Form,
  Message
} from "semantic-ui-react";

const Navigation = () => (
  <Segment inverted vertical>
    <Container>
      <Menu inverted secondary>
        <Menu.Item header>Software anecdotes</Menu.Item>
        <Menu.Item as={NavLink} exact to="/">
          anecdotes
        </Menu.Item>
        <Menu.Item as={NavLink} to="/create">
          create new
        </Menu.Item>
        <Menu.Item as={NavLink} to="/about">
          about
        </Menu.Item>
      </Menu>
    </Container>
  </Segment>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <List relaxed>
      {anecdotes.map(anecdote => (
        <List.Item key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </List.Item>
      ))}
    </List>
  </div>
);

const Anecdote = ({ anecdote: { content, votes, info, author } }) => (
  <div>
    <h2>
      {content} by {author}
    </h2>
    <p>has {votes} votes</p>
    <p>
      for more info see <a href={info}>{info}</a>
    </p>
  </div>
);

const About = () => (
  <Grid>
    <Grid.Column width={12}>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </em>

      <p>
        Software engineering is full of excellent anecdotes, at this app you can
        find the best and add more.
      </p>
    </Grid.Column>
    <Grid.Column width={4}>
      <Image src="/alan-turing.jpg" />
    </Grid.Column>
  </Grid>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{" "}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      info: ""
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Create a new anecdote</h2>
        <Form.Field>
          <label>Content</label>
          <input
            name="content"
            placeholder="Content"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            name="author"
            placeholder="Author"
            value={this.state.author}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>URL for more info</label>
          <input
            name="info"
            placeholder="URL"
            value={this.state.info}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Button>create</Form.Button>
      </Form>
    );
  }
}

const Notification = ({ message }) => (
  <Message positive icon="check" content={message} />
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: "If it hurts, do it more often",
          author: "Jez Humble",
          info:
            "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
          votes: 0,
          id: "1"
        },
        {
          content: "Premature optimization is the root of all evil",
          author: "Donald Knuth",
          info: "http://wiki.c2.com/?PrematureOptimization",
          votes: 0,
          id: "2"
        }
      ],
      notification: ""
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 10000);
    this.props.history.push("/");
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    return (
      <div>
        <Navigation />
        <Segment vertical padded="very">
          <Container>
            {this.state.notification && (
              <Notification message={this.state.notification} />
            )}
            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route
              path="/anecdotes/:id"
              render={({ match: { params: { id } } }) => (
                <Anecdote anecdote={this.anecdoteById(id)} />
              )}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/create"
              render={({ history }) => (
                <CreateNew history={history} addNew={this.addNew} />
              )}
            />
          </Container>
        </Segment>
        <Segment inverted vertical>
          <Container>
            <Footer />
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withRouter(App);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";

import users from "./ducks/users";
import blogs from "./ducks/blogs";
import sessions from "./ducks/sessions";
import notifications from "./ducks/notifications";
import App from "./components/App";

const rootReducer = combineReducers({
  blogs,
  users,
  sessions,
  notifications
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let initialState;
const loggedUserJSON = window.localStorage.getItem("user");
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON);
  initialState = { sessions: { user, form: {} } };
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

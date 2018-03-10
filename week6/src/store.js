import { createStore, combineReducers } from "redux";
import anecdotes from "./reducers/anecdoteReducer";
import notifications from "./reducers/notificationReducer";

const rootReducer = combineReducers({
  anecdotes,
  notifications
});

const store = createStore(rootReducer);

export default store;

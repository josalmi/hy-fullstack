import { createStore, combineReducers } from "redux";
import anecdotes from "./reducers/anecdoteReducer";
import notifications from "./reducers/notificationReducer";
import filter from "./reducers/filterReducer";

const rootReducer = combineReducers({
  anecdotes,
  notifications,
  filter
});

const store = createStore(rootReducer);

export default store;

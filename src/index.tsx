import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./screens/App";
//redux
import { createStore, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import task from "./reducers/taskReducer";
import date from "./reducers/dateReducer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Select from "./screens/Select";
import Login from "./screens/Login";
import user from "./reducers/userReducer";

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

// eslint-disable-next-line no-mixed-operators
const composeReduxDevToolsEnhancers =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  combineReducers({
    task,
    date,
    user,
  }),
  composeReduxDevToolsEnhancers()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={App} />
      <Route exact path="/select" component={Select} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

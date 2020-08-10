import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./containers/Home";
import Notes from "./containers/Notes";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // TODO: Need to handle it in better way
  const isAuth = localStorage.getItem("id_token") ? true : false;
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        isAuth ? <Component {...routerProps} /> : <Redirect to={"/"} />
      }
    />
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/notes" exact component={Notes} />
        <ProtectedRoute path="/notes/:id" exact component={Notes} />
      </Switch>
    </Router>
  );
};

export default App;

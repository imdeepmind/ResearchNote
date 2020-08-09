import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Notes from "./containers/Notes";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/notes" exact component={Notes} />
      </Switch>
    </Router>
  )
};

export default App;

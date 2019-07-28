import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import ProjectsScreen from "./components/ProjectsScreen";

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LoginScreen} />
      <Route path="/projects" component={ProjectsScreen} />
      <Route component={LoginScreen} />
    </Switch>
  </Router>
);

export default AppRouter;

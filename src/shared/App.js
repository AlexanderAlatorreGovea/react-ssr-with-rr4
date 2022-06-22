import React, { Component } from "react";
import { routes } from "./routes";
import { Route, Switch, Router } from "react-router-dom";
import { Navbar } from "./Navbar";
import { NoMatch } from "./NoMatch";
import { createMemoryHistory } from 'history';

const App = () => (
    <div>
      <Navbar />
      <Switch>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => <Component {...props} {...rest} />}
          />
        ))}
        <Route render={(props) => <NoMatch {...props} />} />
      </Switch>
    </div>
);

export { App };

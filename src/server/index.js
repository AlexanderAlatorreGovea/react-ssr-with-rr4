import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";

import { html } from "./html";

import React from "react";
import { App } from "../shared/App";
import { fetchPopularRepos } from "../shared/api";
import { routes } from "../shared/routes";
import { matchPath, StaticRouter } from "react-router-dom";

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) ?? {};
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then((data) => {
      const context = { data };

      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(html(markup, data));
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

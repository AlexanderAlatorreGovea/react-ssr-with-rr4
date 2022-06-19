import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";

import { html } from "./html";

import React from "react";
import { App } from "../shared/App";
import { fetchPopularRepos } from "../shared/api";

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  fetchPopularRepos()
    .then((data) => {
      const markup = renderToString(<App data={data} />);

      res.send(html(markup, data));
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

import React from "react";
import reactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { App } from "../shared/App";

reactDom.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);

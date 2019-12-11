import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./app";

const Root = ({ store }) => (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
);

export default Root;

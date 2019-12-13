import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import ScrollToTop from './ScrollToTop';
import App from "./app";

const Root = ({ store }) => (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <Route path="/" component={App} />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
);

export default Root;

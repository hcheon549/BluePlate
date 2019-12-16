import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";

import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import ScrollToTop from './ScrollToTop';
import App from "./app";

const history = createBrowserHistory();

// Initialize google analytics page view tracking
ReactGA.initialize('UA-154138828-1');

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});


const Root = ({ store }) => (
    <Provider store={store}>
      <BrowserRouter>
          <Router history={history}>
            <ScrollToTop>
              <App path="/" />
            </ScrollToTop>
          </Router>
      </BrowserRouter>
    </Provider>
);

export default Root;

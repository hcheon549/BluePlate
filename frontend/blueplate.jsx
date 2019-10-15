import React from "react";
import ReactDOM from "react-dom";


import configureStore from "./store/store";
import Root from "./components/root";

let store;
store = configureStore();

const render = () => {
  debugger
  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
};

render();

if (module.hot) {
  module.hot.accept("./components/root", () => {
    render();
  });
}
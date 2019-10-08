import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;

  //set preloadedState to current user if there is one
  if (window.currentUser) {
  // if(false){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        id: window.currentUser.id
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //TESTING START:

  // window.cf = changeFilter;
  // window.rt = () => store.getState().ui.filters.restoday;
  // window.f = () => store.getState().ui.filters;
  // window.gs = store.getState;
  // window.dispatch = store.dispatch;
  // window.fetchMeals = fetchMeals;
  // window.searchMeals = searchMeals;
  // window.fetchSchools = fetchSchools;
  // window.updateUser = updateUser;

  //TESTING END:

  ReactDOM.render(<Root store={store} />, root);
});

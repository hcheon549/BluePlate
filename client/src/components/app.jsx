import React from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { getCurrentUser } from "../actions/session_actions";

import Modal from "./modal/modal";

import MyMeal from "./meal/MyMeal";
import Account from "./account/account";
import Favorites from "./account/favorites";
import History from "./account/history";
import LoginForm from "./session_form/login_form";
import SignupForm from "./session_form/signup_form";
import Nav from "./nav/nav";
import Footer from "./footer/footer";
import Landing from "./landing/Landing";

import LoadingIcon from "./meal/loading_icon";

class App extends React.Component {
  // bootstrap user
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    if (!this.props.fetchedUser) {
      return (
        <div>
          <div style={{ height: "60px" }} />
          <LoadingIcon />
        </div>
      );
    } else {
      return (
        <div>
          <Modal />

          <header>
            <Nav />
          </header>

          <main className="main-page">
            <Switch>
              {/* Landing Page */}
              <Route exact path="/" component={Landing} />

              {/* Auth Pages */}
              <AuthRoute path="/login" component={LoginForm} />
              <AuthRoute path="/signup" component={SignupForm} />

              {/* Content Pages */}
              <ProtectedRoute path="/account" component={Account} />
              <ProtectedRoute path="/favorites" component={Favorites} />
              <ProtectedRoute path="/history" component={History} />
              <ProtectedRoute path="/my-meals" component={MyMeal} />
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    fetchedUser: state.ui.filters.fetchedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

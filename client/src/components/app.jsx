import React from "react";
import { Switch } from "react-router-dom";
import Greeting from "./greeting/greeting";
import Account from "./account/account";
import Favorites from "./account/favorites";
import History from "./account/history";
import LoginForm from "./session_form/login_form";
import SignupForm from "./session_form/signup_form";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Nav from "./nav/nav";
import Footer from "./footer/footer";
import Modal from "./modal/modal";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../actions/session_actions";
import LoadingIcon from "./greeting/loading_icon";

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

          <div className="main-body">
            <main className="main-page">
              <Switch>
                <AuthRoute path="/login" component={LoginForm} />
                <AuthRoute path="/signup" component={SignupForm} />
                <ProtectedRoute path="/account" component={Account} />
                <ProtectedRoute
                  path="/favorites"
                  component={Favorites}
                />
                <ProtectedRoute path="/history" component={History} />
                <ProtectedRoute path="/" component={Greeting} />
              </Switch>
            </main>

            <footer>
              <Footer />
            </footer>
          </div>
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

import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { getCurrentUser } from "../actions/session_actions";

import Modal from "./modal/modal";

import MyMeal from "./meal/MyMeal";
import Account from "./account/account";
import Favorites from "./account/favorites";
import History from "./account/history";
import LoginPage from "./session_form/LoginPage";
import StepJoin from "./session_form/StepJoin";
import Nav from "./nav/nav";
import Footer from "./footer/footer";
import Landing from "./landing/Landing";

import LoadingIcon from "./meal/loading_icon";

class App extends React.Component {
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
              <AuthRoute path="/users/login" component={LoginPage} />
              <Route exact path="/users/signup" component={StepJoin} />

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

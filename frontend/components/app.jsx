import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { getCurrentUser } from "../actions/session_actions";
import { fetchSchools } from '../actions/school_actions';
import { fetchTimes } from '../actions/time_action';
import { fetchPlans } from '../actions/plan_actions';

import Modal from "./modal/modal";

import AllMeals from "./AllMeals/AllMeals"
import MyMeal from "./meal/MyMeal";
import Account from "./account/account";
import Favorites from "./account/favorites";
import History from "./account/history";
import LoginPage from "./session_form/LoginPage";
import StepJoin from "./stepJoin/StepJoin";
import Nav from "./nav/Nav";
import Footer from "./footer/footer";
import Landing from "./landing/Landing";
import FAQLanding from './footer/FAQLanding'

import LoadingIcon from "./meal/loading_icon";

class App extends React.Component {
  async componentDidMount() {
    await this.props.getCurrentUser();
    await this.props.fetchSchools();
    await this.props.fetchPlans();
    await this.props.fetchTimes();
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
            <Nav location={this.props.location.pathname}/>
          </header>

          <main className="main-page">
            <Switch>
              {/* Landing Page */}
              <Route exact path="/" component={Landing} />
              <Route path="/faq" component={FAQLanding} />
              <Route exact path="/all-meals" component={AllMeals} />
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
            <Footer {...this.props} />
          </footer>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    schools: state.entities.schools,
    pickupTime: state.entities.pickupTime,
    fetchedUser: state.ui.filters.fetchedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    fetchTimes: () => dispatch(fetchTimes()),
    fetchPlans: () => dispatch(fetchPlans()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

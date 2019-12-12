import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ReactGa from 'react-ga';

import { AuthRoute, ProtectedRoute, AuthenticatedRoute } from "../util/route_util";
import { getCurrentUser } from "../actions/session_actions";
import { fetchSchools } from '../actions/school_actions';
import { fetchTimes } from '../actions/time_action';
import { fetchPlans } from '../actions/plan_actions';

import Modal from "./modal/modal";

import AllMeals from "./AllMeals/AllMeals"
import MyMeal from "./meal/MyMeal";
import Account from "./account/account";
import LoginPage from "./session_form/LoginPage";
import StepJoin from "./stepJoin/StepJoin";
import Navigation from "./nav/Navigation";
import Footer from "./footer/footer";
import Landing from "./landing/Landing";
import FAQLanding from './footer/FAQLanding';
import MobileMenuItems from './nav/MobileMenuItems';

import LoadingIcon from "./meal/loading_icon";

function initializeAnalytic(){
  ReactGa.initialize('UA-154138828-1')
  ReactGa.pageview(window.location.pathname + window.location.search)
}

class App extends React.Component {  
  async componentDidMount() {
    initializeAnalytic();
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
            <Navigation location={this.props.location.pathname}/>
            <MobileMenuItems />
          </header>

          <main className="main-page">
            <Switch>
              {/* Landing Page */}
              <Route exact path="/" component={Landing} />
              <Route exact path="/all-meals" component={AllMeals} />
              <Route exact path="/demo" component={MyMeal} />

              {/* Auth Pages */}
              <AuthRoute exact path="/login" component={LoginPage} />
              <AuthenticatedRoute exact path="/signup" component={StepJoin} />
 
              {/* Content Pages */}
              <ProtectedRoute exact path="/account" component={Account} />
              <ProtectedRoute exact path="/my-meals" component={MyMeal} />

              {/* Footer */}
              <Route exact path="/faq" component={FAQLanding} />
              {/* <Route exact path="/privacy-policy" component={PrivacyPolicy} /> */}
              {/* <Route exact path="/terms-of-use" component={TOU} /> */}

              {/* Collect All */}
              <Redirect from="*" to="/" />
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

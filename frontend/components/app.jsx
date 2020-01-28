import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ReactGa from 'react-ga';

import { AuthRoute, ProtectedRoute, AuthenticatedRoute, AdminRoute } from "../util/route_util";
import { getCurrentUser } from "../actions/session_actions";
import { fetchSchools } from '../actions/school_actions';
import { fetchTimes } from '../actions/time_action';
import { fetchPlans } from '../actions/plan_actions';

import Modal from "./modal/modal";
import Landing from "./landing/Landing";
import AllMeals from "./AllMeals/AllMeals"
import MyMeal from "./meal/MyMeal";
import Account from "./account/account";
import LoginPage from "./session_form/LoginPage";
import ForgotPassword from "./session_form/ForgotPassword";
import ResetPassword from "./session_form/ResetPassword";
import HowItWorks from './HIW/HowItWorks'
import StepJoin from "./stepJoin/StepJoin";
import Navigation from "./nav/Navigation";
import MobileMenuItems from './nav/MobileMenuItems';

import AdminPanel from './admin/AdminPanel';

import Footer from "./footer/footer";
import FAQLanding from './footer/FAQLanding';
import Terms from './footer/Terms';
import PrivacyPolicy from './footer/PrivacyPolicy';
import GeneralTerms from './footer/GeneralTerms';
import LoadingIcon from "./meal/loading_icon";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dataFetched: false
    }
  }

  async componentDidMount() {
    await this.props.getCurrentUser();
    await this.props.fetchSchools();
    await this.props.fetchPlans();
    await this.props.fetchTimes();
    this.setState({
      dataFetched: true
    })
  }

  render() {
    if (!this.state.dataFetched) {
      return (
        <div>
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
              <Route exact path="/menu" component={AllMeals} />
              <Route exact path="/how-it-works" component={HowItWorks} />

              {/* Auth Pages */}
              <AuthRoute exact path="/login" component={LoginPage} />
              <AuthenticatedRoute exact path="/signup" component={StepJoin} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <AuthenticatedRoute path="/reset-password" component={ResetPassword} />
 
              {/* Content Pages */}
              <ProtectedRoute exact path="/account" component={Account} />
              <ProtectedRoute exact path="/my-meals" component={MyMeal} />

              {/* Admin Pages */}
              <AdminRoute exact path="/admin" component={AdminPanel} />

              {/* Footer */}
              <Route exact path="/faq" component={FAQLanding} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/terms-of-use" component={Terms} />
              <Route exact path="/general-terms-conditions" component={GeneralTerms} />

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

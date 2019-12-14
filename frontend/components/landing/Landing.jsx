import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';
import { openModal } from "../../actions/modal_actions";
import { login } from '../../actions/session_actions';

import LandingHeader from './LandingHeader'
import LandingHIW from './LandingHIW';
import LandingMap from './LandingMap';
import LandingPlan from './LandingPlan';
import LandingCapture from './LandingCapture';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.leadCapture = null;
    this.leadCaptureId = null;
    this.openLeadCapture = this.openLeadCapture.bind(this);
  }

  componentDidMount(){
    this.leadCaptureId = setTimeout(this.openLeadCapture, 5000);
  }

  componentWillUnmount(){
    clearTimeout(this.leadCaptureId);
  }

  openLeadCapture(){
    let currentUser = Object.values(this.props.currentUser).length !== 0

    if(!this.props.leadCaptureSeen && !currentUser){
      this.props.openEmailCapture();
    }
  }
  
  render(){
    let schoolEmpty = Object.keys(this.props.schools).length == 0

    return(
      <div className="visitor">
        <LandingHeader {...this.props} />
        <LandingHIW />
        {!schoolEmpty && <LandingMap {...this.props} />}
        <LandingPlan {...this.props} />
        <LandingCapture />
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.entities.schools,
    currentUser: state.entities.currentUser,
    leadCaptureSeen: state.ui.leadCapture.seen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
    processLogIn: (user) => dispatch(login(user)),
    openEmailCapture: () => dispatch(openModal({type: 'emailCapture'})),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));

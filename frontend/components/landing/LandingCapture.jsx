import React from 'react'
import { connect } from 'react-redux';

import { closeModal, setSignature, markAsSeen } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';

import LeadCaptureForm from './../element/LeadCaptureForm';

const LandingCapture = (props) => {
  return (
    <section className="landingCapture">
      <div className="content -narrow">
        <div className="sectionHeader">
          <h4>Get Exclusive Offers</h4>
          <p>Tell us your favorite restaurants. We will give you an exclusive offer for the next semester's plan!</p>
        </div>

        <LeadCaptureForm {...props} style={"primary"} landing={true} />
      </div>
    </section>
  )
}

const mapStateToProps = ({ui}) => {
  return {
    modal: ui.modal,
    leadCaptureSeen: ui.leadCapture.seen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    setSignature: () => dispatch(setSignature()),
    markLeadCaptureAsSeen: () => dispatch(markAsSeen()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingCapture);
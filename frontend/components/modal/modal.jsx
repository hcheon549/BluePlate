import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { closeModal, setSignature, markAsSeen } from '../../actions/modal_actions';

import ReservationModal from './ReservationModal';
import ConfirmModal from './ConfirmModal';
import ClosedModal from './ClosedModal';
import DisclaimerModal from './DisclaimerModal';
import EmailCaptureModal from './EmailCaptureModal';

function Modal(props) {
  if (!props.modal) {
    return null;
  }

  let { modal, closeModal, setSignature, location, markLeadCaptureAsSeen } = props;
  let isLanding = location.pathname == "/";
  let isEmailCapture = (modal.type == 'emailCapture');

  let component;
  switch (modal.type) {
    case 'reserve':
      component =
        <ReservationModal data={modal.data} />;
      break;
    case 'confirm':
      component = <ConfirmModal />;
      break;
    case 'closed':
      component = <ClosedModal closeModal={closeModal} />;
      break;
    case 'disclaimer':
      component = <DisclaimerModal 
                    closeModal={closeModal} 
                    setSignature={setSignature}
                  />;
      break;
    case 'emailCapture':
      component = <EmailCaptureModal
                    landing={isLanding}
                    closeModal={closeModal}
                    markAsSeen={markLeadCaptureAsSeen}
                  />;
      break;
    default:
      return null;
  }

  return (
    <div className={"modal-background" + (isEmailCapture ? ' -emailCapture' : '')}>
      {component}
    </div>
  );
}

const mapStateToProps = ({ui}) => {
  return {
    modal: ui.modal,
    leadCaptureSeen: ui.leadCapture.seen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    setSignature: () => dispatch(setSignature()),
    markLeadCaptureAsSeen: () => dispatch(markAsSeen())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
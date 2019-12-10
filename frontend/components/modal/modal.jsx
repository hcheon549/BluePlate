import React from 'react';
import { closeModal, setSignature } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import ReservationModal from './ReservationModal';
import ConfirmModal from './ConfirmModal';
import ClosedModal from './ClosedModal';
import DisclaimerModal from './DisclaimerModal';
import EmailCaptureModal from './EmailCaptureModal';

function Modal({ modal, closeModal, setSignature }) {
  if (!modal) {
    return null;
  }

  let component;
  let isEmailCapture = (modal.type == 'emailCapture');

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
      component = <EmailCaptureModal />
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

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    setSignature: () => dispatch(setSignature())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
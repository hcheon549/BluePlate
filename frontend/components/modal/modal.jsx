import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ReservationModal from './ReservationModal';
import ConfirmModal from './ConfirmModal';
import ClosedModal from './ClosedModal';
import DisclaimerModal from './DisclaimerModal';


function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

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
      component = <DisclaimerModal closeModal={closeModal} />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background">
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
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
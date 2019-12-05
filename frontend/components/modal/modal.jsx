import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ReservationModal from './ReservationModal';
import ConfirmModal from './ConfirmModal';
import ClosedModal from './ClosedModal';


function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  if(modal.type == 'closed'){
    return <ClosedModal />;
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
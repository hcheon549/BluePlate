import React from "react";

function ConfirmModal({ closeModal, data }) {
  let header, subhead, pickupCode;

  if (data.action == 'reserve'){
    header = 'Your order is reserved!';
    subhead = 'Here\'s the pick up code. We will also email you.';
    pickupCode = data.code;
  } else if (data.action == 'update'){
    header = 'Your order is updated!'
    subhead = 'Your pick up code hasn\'t changed.'
    pickupCode = data.code;
  } else if (data.action == 'cancel'){
    header = 'Your order is cancelled'
    subhead = null;
    pickupCode = null;
  } else {
    header = null
    subhead = null;
    pickupCode = null;
  }

  return (
    <div
      className="confirm-modal animated fadeInDown"
      onClick={e => e.stopPropagation()}
    >
      <div className="confirm-modal-bottom">
        <div className="confirm-modal-text">
          <h4>{header}</h4>
          {subhead && <p>{subhead}</p>}
        </div>
        {pickupCode && <div className="confirm-number">
          {pickupCode}
        </div>}
        <div onClick={closeModal} className="sounds-good">
          Got it!
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

import React from "react";

function ConfirmModal({ closeModal, data }) {
  console.log(data)
  return (
    <div
      className="confirm-modal animated fadeInDown"
      onClick={e => e.stopPropagation()}
    >
      <div className="confirm-modal-top">
        <div />
        <div className="donut-forget">CONFIRMED!</div>
        <div onClick={closeModal} className="confirm-modal-x">
          &times;
        </div>
      </div>

      <div className="confirm-modal-bottom">
        <div className="confirm-modal-text">
          <div>Show thid code at the pick up location.</div>
          <div>
            <span>order number</span> at pickup.
          </div>
        </div>
        <div className="confirm-number"></div>
        <div onClick={closeModal} className="sounds-good">
          Got it!
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

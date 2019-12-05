import React from "react";
import { Link } from 'react-router-dom';

export default function ClosedModal() {
  return (
    <div className="modal-background -closed">
      <div
        className="closed-modal"
        onClick={e => e.stopPropagation()}
      >
        <h2>Your Plan has not started yet...</h2>
        <Link className="button orange" to="/">
          <button className='orange' type="submit">Go to Home Page</button>
        </Link>
      </div>
    </div>
  );
}
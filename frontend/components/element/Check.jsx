import React from 'react';

const Checkmark = ({ order, color = '#F7B4C5'}) => {
  let listOrder = '-o' + order;

  return (
    <div className={'checkmark toAnimate ' + listOrder}>
      <svg x="0px" y="0px" width="19.468px" height="16.946px" viewBox="0 0 19.468 16.946">
        <polyline
          className="path"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeMiterlimit="3"
          points="1.258,9.321 8.446,14.134 17.758,1.571 "
        />
      </svg>
    </div>
  );
};

export default Checkmark;

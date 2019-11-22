import React from "react";

const Tab = (props) => {
    let lunchActive = props.activeTab == 'lunch' ? true : false;
    let dinnerActive = props.activeTab == 'dinner' ? true : false;

    return (
      <ul className="mealTab">
        <div className={"tabLabel" + (lunchActive ? ' active' : '')}  onClick={() => props.handleTab('lunch')} style={{marginLeft: '50px'}}>
          <li>LUNCH</li>
        </div>
        <div className={"tabLabel" + (dinnerActive ? ' active' : '')} onClick={() => props.handleTab('dinner')}>
          <li>DINNER</li>
        </div>
      </ul>
    );
}


export default Tab;
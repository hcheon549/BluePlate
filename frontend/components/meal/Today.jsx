import React from "react";
import { getFullDateMenu } from '../const';

const Today = (props) => {
  let date = getFullDateMenu()

  if (props.isMobile){
    return <h4>{date}</h4>
  }

  return (
    <ul className="mealTab">
      <div className="tabLabel mounted" style={{marginRight: '50px'}}>
        <li>{date}</li>
      </div>
    </ul>
  );
}


export default Today;
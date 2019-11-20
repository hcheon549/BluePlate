import React from 'react';

class SchoolDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.markDropdown = this.markDropdown.bind(this);
  }

  markDropdown(){
    const { schools } = this.props;
    return schools.map((school, idx) => <option className="schoolList" value={school.id} key={idx}>{school.name}</option>)
  }

  render() {
    const { schools, nextAction } = this.props;

    if (schools && schools.length === 0) {
      return (<div></div>);
    }

    return(
        <select className="schoolDropdown" id="dropdown-button" onChange={nextAction}>
          {this.markDropdown()}
        </select>
    );
  }
}


export default SchoolDropdown;

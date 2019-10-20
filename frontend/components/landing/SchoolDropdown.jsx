import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { fetchSchools } from '../../actions/school_actions';

const SchoolDropdownItem = (props) => {
  const school = props.school;
  return (
    <div className="school-dropdown-item" onClick={() => props.setCurrentSchool(school.id)}>
      {school.name}
    </div>
  );
};

class SchoolDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.state = { listOpen: false };
    this.toggleList = this.toggleList.bind(this);
  }

  componentDidMount() {
    this.setState({defaultSchool:""});
    this.props.fetchAllSchools();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentSchoolId !== this.props.currentSchoolId) {
      this.setState({
        listOpen: false
      });
    }
  }

  toggleList(e){
    e.preventDefault();
    const toggleState = !this.state.listOpen;
    this.setState({
      listOpen: toggleState
    });
  }

  render() {
    const schools = this.props.schools;
    if (schools.length === 0) {
      return (<div></div>);
    } else {
      if (!this.state.listOpen) {
        return(
          <div className="school-filter-header">
            <button id="dropdown-button" onClick={this.toggleList}>
              <label>{this.props.currentSchoolName}</label>
            </button>
          </div>
        );
      } else {
        return(
          <div className="school-dropdown" onClick={this.toggleList}>
            <div className="school-filter-header">
              <button id="dropdown-button" onClick={this.toggleList}>
                <label>{this.props.currentSchoolName}</label>
              </button>
            </div>
            <ul className="school-filter-list" id="school-list">
              {schools.map( school => <SchoolDropdownItem key={school.id} school={school}
                setCurrentSchool={this.props.setCurrentSchool}/> )}
              </ul>
            </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  const { schools } = state.entities;
  const { currentSchoolId } = state.ui;
  const currentSchoolName = schools[currentSchoolId] ? schools[currentSchoolId].name : '';
  return {
    schools: Object.values(schools),
    currentSchoolName,
    currentSchoolId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDropdown);

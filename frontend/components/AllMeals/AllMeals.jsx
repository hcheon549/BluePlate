import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMenus } from '../../actions/menu_actions';

import SchoolDropdown from '../landing/SchoolDropdown';

class AllMeals extends Component{
  constructor(props){
    super(props);
    this.state = {
      schoolId: (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null)
    }
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    debugger
    if (this.state.schoolId){
      debugger
      this.props.fetchMenus(this.state.schoolId)
    }
  }

  async update(e){
    await this.props.fetchMenus(e.target.value)
    this.setState({
        schoolId: e.target.value
      })
  }

  render(){

    return(
      <section className="landingMap">
        <div className="content -siteWidth">

          <div className="sectionHeader">
            <h4>All Meals</h4>
          </div>

          <div className="mapSelector">
            <p>I'm in: </p>
            <div className="schoolSelector">
              <SchoolDropdown
                schools={this.props.schools}
                nextAction={this.update}
              />
            </div>
          </div>

        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    schools: state.entities.schools,
    shops: state.entities.shops,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMenus: (schoolId) => dispatch(fetchMenus(schoolId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMeals);

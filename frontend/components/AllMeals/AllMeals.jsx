import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SchoolDropdown from '../landing/SchoolDropdown';

class AllMeals extends Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div>
        <h1>All Meals</h1>
        <SchoolDropdown schools={this.props.schools} />
      </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllMeals);

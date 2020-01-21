import React from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchMeals } from '../../actions/meal_actions';
import { fetchSchools } from '../../actions/school_actions';

import LoadingIcon from "../meal/loading_icon";
import SetMenus from './SetMenus'
import SendOrders from './SendOrders'

class AdminPanel extends React.Component {
  constructor(props){
    super(props)
    this.state={
      schoolId: (this.props.currentUser.schoolId || (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null)),
      tab: "order",
      loading: true
    }
    this.showAdminContent = this.showAdminContent.bind(this)
  }

  async componentDidMount(){
    await this.props.fetchSchools()
    await this.props.fetchMeals(this.state.schoolId)
    this.setState({
      loading: false,
    })
  }

  showAdminContent(){
    switch(this.state.tab){
      case "menu":
        return <SetMenus {...this.props} />;
      case "order":
      default:
        return <SendOrders {...this.props} />;      
    }
  }

  render() {
    return (
      <div className="admin-panel">
        <div className="admin-tab">
          <div className={"tab" + (this.state.tab == "order" ? " active" : "")} onClick={() => this.setState({tab: "order"})}>Send Orders</div>
          <div className={"tab" + (this.state.tab == "menu" ? " active" : "")} onClick={() => this.setState({tab: "menu"})}>Set Menu</div>
        </div>
        {this.state.loading ? <LoadingIcon /> : this.showAdminContent()}
      </div>
    );
  }
}

const msp = ({entities}) => {
  return {
    currentUser: entities.currentUser,
    shops: entities.shops,
    schools: entities.schools,
  };
};

const mdp = (dispatch) => {
 return {
  fetchMeals: (schoolId) => dispatch(fetchMeals(schoolId)),
  fetchSchools: () => dispatch(fetchSchools()),
};
};

export default withRouter(connect(msp, mdp)(AdminPanel));

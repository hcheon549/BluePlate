import React from "react";
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { fetchMeals } from '../../actions/meal_actions';
import { fetchSchools } from '../../actions/school_actions';
import { createMenu } from '../../actions/menu_actions';
import LoadingIcon from "../meal/loading_icon";

class SetMenus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      schoolId: (Object.values(this.props.schools).length > 0 ? Object.values(this.props.schools)[0].id : null),
      loading: true,
      currentShop: (Object.values(this.props.shops).length > 0 ? Object.values(this.props.shops)[0].id : null),
      date: null,
      currentMeal: null,
      lunchQuant: 10,
      dinnerQuant: 10,
    }

    this.markShopsDropdown = this.markShopsDropdown.bind(this);
    this.markMealsDropdown = this.markMealsDropdown.bind(this);
    this.makeDayDropdown = this.makeDayDropdown.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    if (!this.state.schoolId){
      await this.props.fetchSchools()
    } else {
      await this.props.fetchMeals(this.state.schoolId)
      this.setState({
        loading: false,
      })
    }
  }

  async componentDidUpdate(prevProps, prevState){
    if (prevProps.schools !== this.props.schools){
      this.setState({
        schoolId: Object.values(this.props.schools)[0].id
      })
    }
    if (prevProps.shops !== this.props.shops){
      this.setState({
        currentShop: Object.values(this.props.shops)[0].id,
      })
    }
    if ((!prevState.schoolId && this.state.schoolId) || (prevState.schoolId !== this.state.schoolId)){
      await this.props.fetchMeals(this.state.schoolId)
      this.setState({
        loading: false
      })
    }
  }

  makeDayDropdown(){
    let today = moment(new Date());
    let days = []
    for (let i = 0; i < 7; i++){
      days.push(today.format("dddd, M/D/YYYY"))
      today = moment(today).add(1, 'days');
    }
    return days.map((day, idx) => (
      <option className="day" value={day} key={idx}>
        {day}
      </option>
    ))
  }

  markMealsDropdown(){
    return this.props.shops[this.state.currentShop].meals.map((meal, idx) => (
      <option className="shoplist" value={meal.id} key={idx}>
        {meal.name}
      </option>)
    )
  }

  markShopsDropdown(){
    const { shops } = this.props;
    return Object.values(shops).map((shop, idx) => (
      <option className="shoplist" value={shop.id} key={idx}>
        {shop.name}
      </option>)
    )
  }


  update(type, event){
    this.setState({
      submitted: false,
      [type]: event.target.value,
    })
  }

  async handleSubmit(e){
    e.preventDefault();

    let { currentShop, date, currentMeal, lunchQuant, dinnerQuant } = this.state
    let lunch = parseInt(lunchQuant) > 0;
    let dinner = parseInt(dinnerQuant) > 0;
    
    let menuData = {
      shop_id: parseInt(currentShop),
      offered_date: new Date(date),
      meal_id: parseInt(currentMeal),
      lunch,
      dinner,
      lunch_quantity_available: parseInt(lunchQuant),
      dinner_quantity_available: parseInt(dinnerQuant)
    }

    let response = await this.props.createMenu(menuData);

    if (response.status == 200) {
      console.log("SUCCESS")
      this.setState({
        submitted: true
      })
    } else {
      console.log(response)
    }
  }

  render() {
    if (this.state.loading){
      return <LoadingIcon />
    }

    let buttonText = this.state.submitted ? "Done" : "Submit";

    return (
      <div className="admin">
        <form className="dailyMenu" onSubmit={this.handleSubmit}>

          <div className="menuInput" >
            <label>Vendor: </label>
            <select
              className="admin-dropdown"
              id="dropdown-button"
              onChange={this.update.bind(this, "currentShop")}
            >
              {this.markShopsDropdown()}
            </select>
          </div>

          <div className="menuInput" >
            <label>Date: </label>
            <select
              className="admin-dropdown"
              id="dropdown-button"
              onChange={this.update.bind(this, "date")}
            >
            <option hidden value={null}>
              -- Please Select --
            </option>
              {this.makeDayDropdown()}
            </select>
          </div>

          <div className="menuInput" >
            <label>Meal: </label>
            <select
              className="admin-dropdown"
              id="dropdown-button"
              onChange={this.update.bind(this, "currentMeal")}
            >
              <option hidden value={null}>
                -- Please Select --
              </option>
              {this.markMealsDropdown()}
            </select>
          </div>

          <div className="menuInput" >
            <label>Lunch Quantity: </label>
            <input
              className="input"
              name="lunchQuant"
              type="text"
              value={this.state.lunchQuant}
              onChange={this.update.bind(this, "lunchQuant")}
            />
          </div>

          <div className="menuInput" >
            <label>Dinner Quantity: </label>
            <input
              className="input"
              name="dinnerQuant"
              type="text"
              value={this.state.dinnerQuant}
              onChange={this.update.bind(this, "dinnerQuant")}
            />
          </div>

          <button className="primary -fullWidth" type="submit">
            {buttonText}
          </button>
        </form>
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
  createMenu: (menuData) => dispatch(createMenu(menuData))
};
};

export default withRouter(connect(msp, mdp)(SetMenus));

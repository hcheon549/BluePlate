import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { createMenu } from '../../actions/menu_actions';

class SetMenus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      currentShop: null,
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

  makeDayDropdown(){
    let today = moment(new Date());
    let days = []
    for (let i = 0; i < 14; i++){
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
    if (!this.state.currentShop){
      return null
    }
    const { currentShop } = this.state;

    return this.props.shops[currentShop].meals.map((meal, idx) => (
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
    let buttonText = this.state.submitted ? "Done" : "Submit";

    return (
      <div className="setMenus">
        <form className="dailyMenu" onSubmit={this.handleSubmit}>

          <div className="menuInput" >
            <label>Vendor: </label>
            <select
              className="admin-dropdown"
              id="dropdown-button"
              onChange={this.update.bind(this, "currentShop")}
              key={1}
            >
              <option hidden value={null}>
                -- Please Select --
              </option>
              {this.markShopsDropdown()}
            </select>
          </div>

          <div className="menuInput" >
            <label>Date: </label>
            <select
              className="admin-dropdown"
              id="dropdown-button"
              onChange={this.update.bind(this, "date")}
              key={2}
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
              key={3}
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
  createMenu: (menuData) => dispatch(createMenu(menuData))
};
};

export default withRouter(connect(msp, mdp)(SetMenus));

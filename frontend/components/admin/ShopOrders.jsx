import React from 'react';

class DailyDropdown extends React.Component{
  constructor(props) {
    super(props);
    this.markMealsDropdown = this.markMealsDropdown.bind(this);
  }

  markMealsDropdown(){
    return this.props.shops[this.state.currentShop].meals.map((meal, idx) => (
      <option className="shoplist" value={meal.id} key={idx}>
        {meal.name}
      </option>)
    )
  }

  render() {
    const { } = this.props;

    if (schools && schools.length === 0) {
      return (<div></div>);
    }

    return(
      <>
        <label>Monday</label>
        <select
          className="shopDropdown"
          id="dropdown-button"
          onChange={this.update}
        >
          {this.markMealsDropdown()}
        </select>
      </>
);
  }
}

export default DailyDropdown;

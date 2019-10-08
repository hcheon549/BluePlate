import React from "react";
// import { Link, Redirect } from 'react-router-dom';

class Favorites extends React.Component {
  componentDidMount() {
    this.props.fetchMeals(this.props.currentUser.enrolledSchool);
    this.props.fetchFavorites();
  }

  render() {
    let { meals, shops } = this.props;

    return (
      <div className="favorites-page">
        <div className="favorites-container">
          <div className="favorites-title">MY FAVORITE SHOPS</div>

          <div className="favorites-list">
            {meals.map(meal => {
              return (
                <div key={meal.id} className="favorite-item">
                  <div className="fav-title-icon">
                    <div className="fav-title">{shops[meal.shopId].name}</div>

                    <div className="fav-icon">
                      <img
                        src="https://res.cloudinary.com/mwojick/image/upload/v1528825174/TreatPal/icons/favorited.png"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="fav-address">
                    {shops[meal.shopId].address}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;

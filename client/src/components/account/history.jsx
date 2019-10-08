import React from "react";
// import { Link, Redirect } from 'react-router-dom';

class History extends React.Component {
  componentDidMount() {
    this.props.fetchMeals(this.props.currentUser.preferredCity);
    this.props.fetchFavorites();
    this.props.fetchReservations();
  }

  render() {
    let { meals, shops, cityReses, favIds } = this.props;

    if (cityReses.length === 0) {
      return (
        <div className="favorites-page">
          <div className="favorites-container">
            <div className="favorites-title">MY HISTORY</div>

            <div className="favorites-list" />
          </div>
        </div>
      );
    }

    return (
      <div className="favorites-page">
        <div className="favorites-container">
          <div className="history-title">MY HISTORY</div>

          <div className="favorites-list">
            {cityReses.map(res => {
              return (
                <div key={res.id} className="res-item">
                  <div className="reserv-image">
                    <img alt="" src={meals[res.mealId].imageUrl} />
                  </div>

                  <div className="reserv-text">
                    <div className="res-title-icon">
                      <div className="res-title">
                        {meals[res.mealId].name}
                      </div>

                      <div className="fav-icon">
                        <img
                          alt=""
                          src={
                            favIds[meals[res.mealId].shopId]
                              ? "https://res.cloudinary.com/mwojick/image/upload/v1528825174/TreatPal/icons/favorited.png"
                              : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="res-shopname">
                      {shops[meals[res.mealId].shopId].name}
                    </div>

                    <div className="fav-address">
                      {shops[meals[res.mealId].shopId].address}
                    </div>

                    <div className="res-date">{res.date}</div>
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

export default History;

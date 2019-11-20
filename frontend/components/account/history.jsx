import React from "react";
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchMenus } from '../../actions/menu_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { fetchReservations } from '../../actions/reservation_actions';
import { getFavIds, getSchoolReservations } from '../../util/selectors';



class History extends React.Component {
  componentDidMount() {
    this.props.fetchMenus(this.props.currentUser.schoolId);
    this.props.fetchFavorites();
    this.props.fetchReservations();
  }

  render() {
    let { meals, shops, schoolReses, favIds } = this.props;

    if (schoolReses.length === 0) {
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
            {schoolReses.map(res => {
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

const msp = ({entities:
  {currentUser, menus, shops, schools, favorites, reservations},
  session, errors, ui}) => {

  let schoolReses = getSchoolReservations(reservations, menus, false);
  schoolReses = schoolReses.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });

  let favIds = getFavIds(favorites);

 return {
    currentUser,
    menus,
    favIds: favIds,
    schoolReses: schoolReses,
    shops: shops
  };
};

const mdp = (dispatch) => {
 return {
   fetchMenus: (schoolId) => dispatch(fetchMenus(schoolId)),
   fetchFavorites: () => dispatch(fetchFavorites()),
   fetchReservations: () => dispatch(fetchReservations())
 };
};

export default withRouter(connect(msp, mdp)(History));

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchMenus } from '../../actions/menu_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { fetchReservations } from '../../actions/accountHistory_actions';
import { getFavIds, getSchoolReservations } from '../../util/selectors';



class History extends React.Component {
  async componentDidMount() {
    await this.props.fetchMenus(this.props.currentUser.schoolId);
    await this.props.fetchReservations();
    // await this.props.fetchFavorites();
  }

  render() {
    let { menus, shops, schoolReses, favIds } = this.props;

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
                    <img alt="" src={menus[res.menuId].imageUrl} />
                  </div>

                  <div className="reserv-text">
                    <div className="res-title-icon">
                      <div className="res-title">
                        {menus[res.menuId].name}
                      </div>

                      <div className="fav-icon">
                        <img
                          alt=""
                          src={
                            favIds[menus[res.menuId].shopId]
                              ? "https://res.cloudinary.com/mwojick/image/upload/v1528825174/TreatPal/icons/favorited.png"
                              : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="res-shopname">
                      {shops[menus[res.menuId].shopId].name}
                    </div>

                    <div className="fav-address">
                      {shops[menus[res.menuId].shopId].address}
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

import React from "react";
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchMeals } from '../../actions/meal_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import { getFavorites, getFavMeals, getFavShops, getFavIds } from '../../util/selectors';
import { deleteFavorite } from '../../actions/favorite_actions';

class Favorites extends React.Component {
  componentDidMount() {
    this.props.fetchFavorites();
  }

  render() {
    let { favShops, favIds, deleteFavorite } = this.props;

    return (
      <div className="favorites-page">
        <div className="favorites-container">
          <div className="favorites-title">MY FAVORITE SHOPS</div>

          <div className="favorites-list">
            {favShops.map(favShop => {
              return (
                <div key={favShop.id} className="favorite-item">
                  <div className="fav-title-remove">
                    <div className="fav-title">{favShop.name}</div>

                    <div className="fav-remove">
                      <span className="remove" onClick={()=>deleteFavorite(favIds[favShop.id])}>Remove</span>
                    </div>
                  </div>

                  <div className="fav-address">
                    {favShop.address}
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

const mapStateToProps = (
  { entities: {users, meals, shops, schools, favorites},
    session,
    errors,
    ui}
  ) => {
    let favs = getFavorites(favorites);
    let shopsFavs = getFavShops(Object.values(shops), favs, true);
    let favIds = getFavIds(favorites)

  return {
      currentUser: users[session.id],
      favShops: shopsFavs,
      favIds,
    };
};

const mapDispatchToProps = (dispatch) => {
 return {
   fetchFavorites: () => dispatch(fetchFavorites()),
   deleteFavorite: (id) => dispatch(deleteFavorite(id)),
 };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));

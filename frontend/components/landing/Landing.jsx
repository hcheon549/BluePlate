import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// import { fetchDeals } from '../../actions/deal_actions';
// import { fetchAllCities, setCurrentCity } from '../../actions/city_actions';
// import { updateTempEmail } from '../../actions/session_actions';
// import MapContainer from '../map/map_container';
// import CityDropdownContainer from '../search/city_dropdown_container';
// import SpotlightCarousel from './spotlight_content_container';

import LandingHeader from './LandingHeader'
import LandingHIW from './LandingHIW';
import LandingMap from './LandingMap';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    
  }

  // componentDidMount() {
    // this.props.fetchAllCities();
    // let cityId = this.props.currentCityId;
    // this.props.fetchDeals(cityId);
  // }

  // componentDidUpdate(prevProps) {
    // if (prevProps.currentCityId !== this.props.currentCityId) {
    //   let cityId = this.props.currentCityId;
    //   this.props.fetchDeals(cityId);
    // }
  // }

  
  render(){

    return(
      <div className="visitor">
        <LandingHeader />
        <LandingHIW />
        <LandingMap />
    </div>
    );
  }
}

// const msp = state => {
//   const { deals } = state.entities || " ";
//   return {
//     deals,
//     currentCityId: state.ui.currentCityId,
//   };
// };

// const mdp = dispatch => {
//   return({
//     fetchAllCities: () => dispatch(fetchAllCities()),
//     setCurrentCity: (currentCityId) => {
//       dispatch(setCurrentCity(currentCityId));
//     },
//     fetchDeals: (cityId) => dispatch(fetchDeals(cityId)),
//     updateTempEmail: (email) => dispatch(updateTempEmail(email))
//   }
//   );
// };
// export default withRouter(connect(msp, mdp)(Landing));

export default Landing;

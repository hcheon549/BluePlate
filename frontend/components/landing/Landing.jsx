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

        {/* <div className="robot-info">
          <img className="robot-orange icon" src={window.orangerobot_img} />
          <div className="robot-text">
            <h3 className="robot-pal">HI, I’M PAL, YOUR BEER BUDDY</h3>
            <p>
              I’ll learn your preferences and make happy hour the best time of your day!
            </p>
          </div>
        </div>
        <div className="map-container">
          <span className="section-title">Bubbly and Delicious.</span>
          <div className="map-column">
            <div className="map-location">
              <p>I'm in: </p>
              <br/>
              <div className="city-selector">
                <CityDropdownContainer />
            </div>
          </div>
          <div className="map">
            <MapContainer />
          </div>
        </div>
      </div>
      <div className="spotlight-content">
            <div className="spotlight-detail">
              <SpotlightCarousel />
            </div>
      </div>
      <div className="bottom-invite">
        <div className="bottom-invite-form">{inviteForm}</div>
        <img className="robot-img icon" src={window.bluerobot_img} />
      </div> */}
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

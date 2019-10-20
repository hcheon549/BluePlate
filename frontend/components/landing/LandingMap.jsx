import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LandingMap extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <section className="landingMap">
        <div className="content -siteWidth">
          <div className="sectionHeader">
            <h4>Find out the restaurants</h4>
          </div>

          <div className="map-location">
            <p>I'm in: </p>
            <br/>
            <div className="city-selector">
              {/* <CityDropdownContainer /> */}
            </div>
          </div>

          <div className="map">
            {/* <MapContainer /> */}
          </div>

        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return
}

function mapDispatchToProps(dispatch) {
  return
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingMap);

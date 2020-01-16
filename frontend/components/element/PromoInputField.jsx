import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchOnePromo } from '../../actions/promo_actions';

class PromoInputField extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      promoApplied: false,
      isPending: false,
      promoCode: '',
      appliedPromo: '',
      errorMessage: []
    }

    this.applyPromo = this.applyPromo.bind(this);

  }

  async applyPromo(e){
    e.preventDefault();
    this.setState({ isPending: true })
    let { promoCode } = this.state;

    let promoResponse = await this.props.matchPromo(promoCode)

    if (promoResponse.promo) {
      this.setState({ 
        isPending: false,
        appliedPromo: promoResponse.promo.code,
        promoApplied: true
      })
      setTimeout(this.props.togglePromoInput, 5000)
    } else {
      this.setState({
        isPending: false,
        errorMessage: promoResponse.error
      })
    }
  }

  update(type, event) {
    if (this.state.errorMessage.length > 0){
      this.setState({ errorMessage: [] })
    }
    
    this.setState({ 
      [type]: event.target.value.toUpperCase()
    });
  }

  renderErrors() {
    return (
      <ul className="error" role="alert">
        {this.state.errorMessage.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    );
  }

  render(){
    let { isPending, errorMessage, promoApplied } = this.state;
    let buttonText = promoApplied ? 'Success!' : 'Apply'

    return (
      <form onSubmit={this.applyPromo} className="login-form-box">
        <div className="updateEmail-form">
          <label className="login-label">
            <input
              type="text"
              value={this.state.promoCode}
              onChange={this.update.bind(this, "promoCode")}
              className="login-input"
            />
          </label>

          <button className={("secondary") +  (this.state.isPending ? " -pending" : "")} type="submit" disabled={promoApplied || isPending} >
            {!this.state.isPending && buttonText}
          </button>
        </div>
        {(errorMessage && errorMessage.length > 0) && this.renderErrors()}
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPromo: state.ui.promo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    matchPromo: (promoCode) => dispatch(fetchOnePromo(promoCode)),
  };
 };
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromoInputField));
 
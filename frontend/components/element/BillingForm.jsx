/*
  BillingForm
*/

import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { clearErrors } from '../../actions/session_actions';


class BillingForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPending: false,
      card_number: "",
      card_code: "",
      expiration: "",
      zipCode: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({isPending: true})
    const payment_method = Object.assign({}, this.state);
    console.log(payment_method);
  }

  update(type) {
    return e => {
      if (this.props.errors){
        this.props.clearErrors();
      }
      this.setState({
        [type]: e.currentTarget.value
      }); 
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render(){
    return(
      <form>
        <fieldset className="billingForm">
          <div className="fullWidth">
            <label>Credit card no.</label>
            <input
              type="text"
              autoComplete="credit_Card"
              value={this.state.card_number}
              onChange={this.update("card_number")}
              className="login-input"
            />
          </div>
          <div className="third left">
            <label>CVV</label>
            <input
              type="text"
              autoComplete="cvv"
              value={this.state.card_code}
              onChange={this.update("card_code")}
              className="login-input"
            />
          </div>
          <div className="third middle">
            <label>Exp. (MM/YY)</label>
            <input
              type="text"
              autoComplete="expiration"
              value={this.state.expiration}
              onChange={this.update("expiration")}
              className="login-input"
            />
          </div>
          <div className="third right">
            <label>Zip</label>
            <input
              type="text"
              autoComplete="zipCode"
              value={this.state.zipCode}
              onChange={this.update("zipCode")}
              className="login-input"
            />
          </div>
          <div className="confirmationActions center">
            <button className={"primary -fullWidth"} id="bt-submit" type="submit">Submit</button>;
          </div>
        </fieldset>
    </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => dispatch(clearErrors())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingForm));
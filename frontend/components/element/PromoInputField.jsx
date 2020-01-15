import React from "react";

class PromoInputField extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      promoApplied: false,
      isPending: false,
      promoCode: '',
      errorMessage: []
    }

    this.applyPromo = this.applyPromo.bind(this);

  }

  async applyPromo(e){
    e.preventDefault();
    this.setState({ isPending: true })

    console.log('herehereraufiu')
  }

  update(type, event) {
    let validationState = ["promoCode"];
    this.state[type] = validationState.includes(type) ? event.target.value.replace(/\s+/g, '') : event.target.value;
    this.setState({ 
      [type]: this.state[type] 
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

          <button className={"secondary"} type="submit" disabled={promoApplied || isPending} >
            {buttonText}
          </button>
        </div>
        {(errorMessage && errorMessage.length > 0) && this.renderErrors()}
      </form>
    )
  }
}

export default PromoInputField;
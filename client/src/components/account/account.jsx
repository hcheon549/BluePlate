import React from "react";
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUser } from '../../actions/user_actions';

class Account extends React.Component {
  constructor(props) {
    super(props);

    let name = this.props.currentUser.name || "";
    let fname = this.props.currentUser.fname || "";
    let lname = this.props.currentUser.lname || "";

    this.state = {
      id: this.props.currentUser.id,
      name: name,
      email: this.props.currentUser.email,
      fname: fname,
      lname: lname
    };
  }

  update(type) {
    return e => this.setState({ [type]: e.currentTarget.value });
  }

  render() {
    let { currentUser, errors } = this.props;

    let mealType = [];
    for (let i = 0; i < 20; i++) {
      if (i < currentUser.mealsLeft) {
        mealType.unshift(false);
      } else {
        mealType.unshift(true);
      }
    }

    return (
      <div className="account-page">
        <div className="account-top">
          <div className="account-hi">Hi {currentUser.name}!</div>
          <div className="account-plan">
            You are currently on the <span>20 MEAL PLAN.</span>
          </div>
          <div className="account-cycle">
            You have <span>{currentUser.mealsLeft} MORE MEALS</span> left in
            your cycle.
          </div>
          <div className="account-icons">
            {mealType.map((type, idx) => {
              return (
                <img
                  key={idx}
                  alt=""
                  src={
                    type
                      ? "https://res.cloudinary.com/mwojick/image/upload/v1529051209/TreatPal/icons/ic-used.png"
                      : "https://res.cloudinary.com/mwojick/image/upload/v1533444387/TreatPal/icons/ic-unused-c.png"
                  }
                />
              );
            })}
          </div>

          <div className="acc-info">
            <span>YOUR ACCOUNT INFORMATION</span>
          </div>
        </div>

        <div className="account-bottom">

          <div className="account-text">
            <div className="account-name">
              <strong>NAME:</strong>
              <input
                type="text"
                disabled={this.state.email === "demo" ? true : false}
                value={this.state.name}
                onChange={this.update("name")}
              />
            </div>

            <div className="account-email">
              <strong>EMAIL:</strong>
              {errors}
              <input
                type="text"
                disabled={this.state.email === "demo" ? true : false}
                value={this.state.email}
                onChange={this.update("email")}
              />
            </div>

            <button
              className="acc-update"
              onClick={() => this.props.updateUser(this.state)}
            >
              Update Info
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const msp = ({entities:
  {users, meals, shops, schools, favorites, reservations},
  session, errors, ui}) => {

 return {
    currentUser: users[session.id],
    errors: errors.users
  };
};

const mdp = (dispatch) => {
 return {
   updateUser: (user) => dispatch(updateUser(user))
 };
};

export default withRouter(connect(msp, mdp)(Account));

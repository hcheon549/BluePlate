import React from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { fetchSchools } from '../../actions/school_actions';

class EmailCapture extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      school: null,
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeDropdown = this.makeDropdown.bind(this);
  }

  componentDidMount(){
    this.props.fetchSchools()
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    console.log('Capture Email here')
    this.props.nextAction();
  }

  makeDropdown() {
    let schoolOptions;
    if (this.props.schools.length >= 0){
      schoolOptions = this.props.schools.map((school, idx) => 
        <option key={idx} value={school.id}>{school.name}</option>
      )
    }
    return schoolOptions
  }


  render() {
    let { buttonText } = this.props

    return (
      <form className="joinForm">
        <input type="text"
          placeholder="your email"
          value={this.state.email}
          onChange={this.update('email')}/>
        <div>
        <select name="school">
          {this.makeDropdown()}
        </select>

          <Link to="/users/signup">
            <button className={this.props.buttonType} type="submit" onClick={this.handleSubmit}>{buttonText}</button>
          </Link>
        </div>
      </form>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    schools: Object.values(state.entities.schools)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSchools: () => dispatch(fetchSchools()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailCapture);

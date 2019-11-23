import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../actions/userActions';
import Register from '../Users/Register/Register';

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      email:'',
      role: false,
      errors: {},
    }
  }

  render() {
    const { user } = this.props.auth; console.log(user);
    return (
        <div className="container is-center">
        {!user.userRole ? "Du behöver admin rättigheter för att kunna se denna sida" :
          <Register />
        }
      </div>
    )
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  })

export default connect(mapStateToProps, {addUser} )(withRouter(AddUser));
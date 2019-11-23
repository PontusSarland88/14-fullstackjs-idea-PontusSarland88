import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import EditUser from './EditUser';

class EditUsers extends Component {
  constructor() {
    super();
    this.state = {
      allUsers: [],
      errors: {},
    };
  }

  componentWillMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allUsers: nextProps.users.users,
    });
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <h2 className="title">Användare</h2>
        </div>
        <div>
          {this.state.allUsers.length > 0 ? 
            this.state.allUsers.map((val, i) => {
              return <EditUser key={i} userData={val}/>
            })
        :
            <p>Inga användare hittades</p>
          }
        </div>
      </div>
    )
  }
}

EditUsers.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users,
})

export default connect(mapStateToProps, { getAllUsers })(withRouter(EditUsers));
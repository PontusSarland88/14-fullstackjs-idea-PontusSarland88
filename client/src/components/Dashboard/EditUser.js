import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers, deleteUser, updateUser } from '../../actions/userActions';
import 'bulma-switch'; 
import './styles.css';
class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      role: false,
      name: '',
      email: '',
      errors: {},
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.userData._id,
      role: this.props.userData.role,
      name: this.props.userData.name,
      email: this.props.userData.email,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
    }  
    this.props.updateUser(updatedProduct, this.props.history);
  }

  onChange = (e, value) => {
    this.setState({[e.target.name]: value});
  }

  // checkboxCheck = (e) => {
  //   this.setState({[e.target.name]: this.refs.availableCheck.checked});
  // }

  // checkboxValue = () => {
  //   return this.state.role ? "checked" : ""
  // }

  deleteAUser = (e) => {
    e.preventDefault();
    this.props.deleteUser(this.state.id, this.props.history);
  }

  changeActive= (e) => {
    if(this.state.role) {
      this.setState({
        role: false
      });
    } else {
      this.setState({
        role: true
      });
    }
  }

  render() {
    return (
      <div className="media">
        <div className="media-content box">
          <form onSubmit={this.onSubmit} key={this.props.key}>
            <input className="input" type="text" name="name" value={this.state.name} onChange={e => this.onChange(e, e.target.value)}/>
            <input className="input" type="text" name="email"  value={this.state.email} onChange={e => this.onChange(e, e.target.value)}/>
            <div className="field has-addons is-rounded">
                <label className="label">Administratör: </label>
                <span className={this.state.role ? "button is-rounded is-success " : "button is-rounded"} onClick={(e) => this.changeActive(e)}>Ja</span>
                <span className={!this.state.role ? "button is-rounded is-danger" : "button is-rounded"} onClick={(e) => this.changeActive(e)}>Nej</span>
              </div>
            <div className="field is-grouped">
              <div className="control">
                  <button className="button is-success is-small is-link">Spara användare</button>
              </div>
              <div className="control">
                  <button className="button is-danger is-small is-link" onClick={e => this.deleteAUser(e)}>Ta bort användare</button>
              </div>  
              </div>
          </form>
        </div>
      </div>
    )
  }
}

EditUser.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users,
})

export default connect(mapStateToProps, { getAllUsers, deleteUser, updateUser })(withRouter(EditUser));
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        this.props.registerUser(newUser, this.props.history);
    }

    // componentDidMount() {
    //     if(this.props.auth.isAuthenticated) {
    //         this.props.history.push('/dashboard');
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    render() {
        const {errors} = this.state;
        // const {user} = this.props.auth;

    return (
      <div className="container is-centered">
        <h2 className="title">Register</h2>
        <form noValidate onSubmit={this.onSubmit}>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className={classnames('input', {
                        'is-danger': errors.name
                    })} 
                    name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="user" />
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                {errors.name ?
            <p className="help is-danger">{errors.name}</p> : null}
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className={classnames('input', {
                        'is-danger': errors.email
                    })} 
                    name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="envelope" />
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                {this.state.errors.email ?
            <p className="help is-danger">{this.state.errors.email}</p> : null}
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className={classnames('input', {
                        'is-danger': errors.password
                    })} 
                    name="password" type="password" placeholder="Lösenord" value={this.state.password} onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="key" />
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                {this.state.errors.password ?
                <p className="help is-danger">{this.state.errors.password}</p> : null}
            </div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className={classnames('input', {
                        'is-danger': errors.password2
                    })} 
                    name="password2" type="password" placeholder="Upprepa Lösenord" value={this.state.password2} onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon="key" />
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                {this.state.errors.password2 ?
            <p className="help is-danger">{this.state.errors.password2}</p> : null}
            </div>
            <div className="field is-grouped">
            <div className="control">
                <button className="button is-success is-link">Registrera</button>
            </div>
            <div className="control">
                <Link className="button is-danger is-text" to="/">
                    Avbryt
                </Link>
            </div>
        </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateProps, {registerUser})(withRouter(Register));
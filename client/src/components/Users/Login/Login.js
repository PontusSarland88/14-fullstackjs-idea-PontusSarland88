import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../../actions/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const userLoginInput = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userLoginInput);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) { 
        if(nextProps.auth.isAuthenticated && nextProps.auth.user.userRole === true) {
            this.props.history.push('/dashboard');
        } else if (nextProps.auth.isAuthenticated && nextProps.auth.user.userRole === false) {
            this.props.history.push('/profile')
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

  render() {
    const { errors } = this.state;
    return (
        <div className="container is-centered">
            <h2 className="title">Logga in</h2>
            <form onSubmit={this.onSubmit}>
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
                    {errors.email ?
                    <p className="help is-danger">{errors.email}</p> : null}
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
                    {errors.password ?
                    <p className="help is-danger">{errors.password}</p> : null}
                </div>
                <div className="field is-grouped">
                <div className="control">
                    <button className="button is-success is-link">Logga in</button>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);

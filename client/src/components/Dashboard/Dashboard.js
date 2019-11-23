import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    const adminView = (
      <div>      
        <div className="container ">
          <h2 className="title">Admin vy</h2>
        </div>
        <div className="box">
          <article className="media">
            <div className="box">
              <Link to="/dashboard/edit/products" className="media-content box">
                <div className="content">
                  <h3 className="is-center"> 
                    Editera produkter
                  </h3>
                </div>
              </Link>
            </div>
            <div className="box">
              <Link to="/dashboard/add/product" className="media-content box">
                <div className="content">
                  <h3 className="is-center"> 
                    Lägg till produkter
                  </h3>
                </div>
              </Link>
            </div>
          </article>
        </div>
        <div className="box">
          <article className="media">
            <div className="box">
              <Link to="/dashboard/edit/users" className="media-content box">
                <div className="content">
                  <h3 className="is-centered"> 
                  Användare
                  </h3>
                </div>
              </Link>
            </div>
            <div className="box">
              <Link to="/dashboard/add/user" className="media-content box">
                <div className="content">
                  <h3 className="is-centered"> 
                  Skapa användare
                  </h3>
                </div>
              </Link>
            </div>
          </article>
        </div>
        <div className="box">
          <article className="media">
            <Link to="/dashboard/edit/orders" className="media-content box">
              <div className="content">
                <h3 className="is-centered"> 
                Ordrar
                </h3>
              </div>
            </Link>
          </article>
        </div>
      </div>
    );

    const notAdminView = (
      <div>
        <h2>Need admin rights to view this page</h2>
      </div>
    )

    return (
      <div className="Section">
        {user.userRole ? adminView : notAdminView}
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {} )(Dashboard);
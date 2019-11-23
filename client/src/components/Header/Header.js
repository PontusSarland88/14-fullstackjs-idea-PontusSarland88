import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
  constructor() {
    super();
    this.state = {
        cart: [],
    }
  };

  componentDidMount() {
    const cookieCart = JSON.parse(localStorage.getItem("cart"));
    if(cookieCart) {
      this.setState({
        cart: cookieCart
      });
    }
  }
  render() {
    return (
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="level">
              <h1 className="title" >
                  <Link to="/" >Pralinbutiken</Link>
              </h1>
              <div className="cart-container">
              <Link to={{
                  pathname: '/neworder',
                  state: {
                    cart: this.state.cart,
                  }
                }}>
                  <FontAwesomeIcon className="cart-icon" icon="shopping-cart" />
                  <div className="cart-counter">
                    {this.state.cart.length}  
                  </div>
                </Link >
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      </section>
    );
  }
}
export default Header;

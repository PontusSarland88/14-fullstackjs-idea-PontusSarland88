import React, { Component } from 'react'
import { updateOrder } from '../../actions/orderActions';

import './Orders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCart: [],
    }
  }

  componentDidMount() {
    let { cart } = this.props.location.state;
    if(cart.length < 1) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    this.setState({
      userCart: cart,
    })
  }

  onChange = (e, value) => { 
    const cart = Object.assign(this.state.userCart);
    cart[e.target.id][e.target.name] = value;
    this.setState({cart});

    localStorage.setItem("cart", JSON.stringify(cart));
    this.forceUpdate(); // here because cart isnt updated if we switch from product page to cart page.
  }

  addOneToCart = (position, value) => {
    const cart = Object.assign(this.state.userCart);
    let newQuantity = cart[position].quantity;
    
    if(value === '+') {
      newQuantity++;
    } else if(value === '-') {
      newQuantity--;
    }

    cart[position].quantity = newQuantity;
    if(newQuantity < 1) {
      cart.splice(position, 1);
    }
    this.setState({
      userCart: cart
    });
    if(this.state.userCart === []) {
      localStorage.clear();
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }    

    this.forceUpdate();
  }

  render() {
    return ( 
      <div className="container">
        {this.state.userCart ?
        this.state.userCart.map((val, i) => {
          return (
            <div className="box" key={i}>
              <div className="media">
                <div className="media-content">
                  <div className="field is-horizontal" >
                    <div className="field-label">
                      <label>Namn:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <p>{val.productName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal" >
                    <div className="field-label">
                        <label>Pris:</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <p>{val.price} kr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal" >
                    <div className="field-label">
                      <label>Antal:</label>
                    </div>
                    <div className="field-body">
                      <div id="inputWidht" className="field is-horizontal">
                        <button className="button" onClick={e => this.addOneToCart(i, '-')}>
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input className="input" id={i} name="quantity" value={this.state.userCart[i].quantity} onChange={e => this.onChange(e, e.target.value)}>
                        </input>
                        <button className="button" onClick={e => this.addOneToCart(i, '+')}>
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        : 
        <h1>Nothing in cart</h1>
        }
      </div>
    )
  }
}

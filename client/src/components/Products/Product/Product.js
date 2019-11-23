import React, { Component } from 'react';

import 'bulma/css/bulma.css';
import 'bulma-extensions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// TODO: remove and show correct image.
import pralin from '../../pralin.jpg';

function SelectList() {
  var rows = [];
  for (let i = 0; i  < 21; i ++) {
    rows.push(<option key={i} id={i} value={i}>{i}</option>)
  }
  return (<select>{rows}</select>);
}

export default class Products extends Component {    
  constructor() {
    super();
    this.state = {
      userCart: [],
    }
    this.amountOfPralins = React.createRef();
  }

  addToCart = (product, e) => {
    e.preventDefault();
    
    if(this.amountOfPralins.current.childNodes[0].value > 0) {
      let existingCart = JSON.parse(localStorage.getItem("cart"));
      if(existingCart == null){
        existingCart = [];
      }

      let alreadyExists = false;
      const productToAdd = {
        id: product._id,
        image: product.image,
        weight: product.weight,
        productName: product.name,
        price: product.price,
        quantity: this.amountOfPralins.current.childNodes[0].value,
      };

      existingCart.forEach((element, index) => {
        if(element.id == product._id) {
          existingCart[index] = productToAdd;
          alreadyExists = true;
        }
      });

      if(!alreadyExists) {
        existingCart.push(productToAdd);
      }
      this.setState({
        userCart: existingCart
      });
      localStorage.setItem("cart", JSON.stringify(existingCart));
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="box">
        <article className="media">
          <figure className="media-left image">
            <img className="figure" src={pralin} alt={this.props.productData.name}/>
          </figure>
          <div className="media-content box">
            <div className="content">
              <h3> 
              {this.props.productData.name}
              </h3>
                {this.props.productData.description ?
                <p>Beskrivning: {this.props.productData.description}. </p> : null}
                {this.props.productData.ingredients ? 
                <p>Ingredienser: {this.props.productData.ingredients}. </p> : null}
                {this.props.productData.weight ? 
                <p>Vikt: {this.props.productData.weight} g. </p> : null}
                {this.props.productData.price ? 
                <p>Pris: {this.props.productData.price} kr/st. </p> : null}
                <div className="control has-icons-left is-rounded">
                <div className="select" ref={this.amountOfPralins}>
                <SelectList />
                </div>
                  <button className="button is-right" onClick={e => this.addToCart(this.props.productData, e)}>
                    <FontAwesomeIcon icon="shopping-cart" />
                  </button>
                </div>
              </div>
            </div>
        </article>
      </div>
    )
  }
}

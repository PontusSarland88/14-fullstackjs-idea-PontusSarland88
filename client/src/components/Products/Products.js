import React, { Component } from 'react';
import Product from '../Products/Product/Product';
import 'bulma/css/bulma.css';
import 'bulma-extensions';

export default class Products extends Component {    
    constructor() {
        super();
        this.state = {
          productList: []
        };
      }
    componentDidMount() {
        const now = this;
        fetch("/api/products/active")
          .then(function(response) {
            return response.json();
          })
          .then(function(products) {
            now.setState({ productList: products });
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    render() {
        return (
        <div className="section">
          <div className="container ">
            <h2 className="title">Produkter</h2>
          </div>
            {this.state.productList.map((val, i) => {
              return <Product key={i} productData={val} />;
            })}
        </div>
        )
    }
}

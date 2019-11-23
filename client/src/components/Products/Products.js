import React, { Component } from 'react';
import Product from '../Products/Product/Product';
import 'bulma/css/bulma.css';
import 'bulma-extensions';
// TODO: is this needed here? prop-types and connect
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
class Products extends Component {    
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
            now.setState({productList: products});
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
            {this.state.productList.length > 0 ?
              this.state.productList.map((val, i) => {
              return <Product key={i} productData={val} />;
            })
            : <p>Inga produkter finns tillgängliga</p>}
        </div>
        )
    }
}
// TODO: is this needed here?
Products.propTypes = {
  auth: PropTypes.object.isRequired
}
// TODO: is this needed here?
const mapStateProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateProps)(Products); 
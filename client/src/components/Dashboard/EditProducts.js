import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/productActions';
import EditProduct from './EditProduct';

class EditProducts extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
      errors: {},
    };
  }

  componentWillMount() {
    this.props.getAllProducts();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allProducts: nextProps.products.products,
    });
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <h2 className="title">Produkter</h2>
        </div>
        <div>
          {this.state.allProducts.length > 0 ? 
            this.state.allProducts.map((val, i) => {
              return <EditProduct key={i} productData={val} />
            })
        :
            <p>Inga produkter hittades</p>
          } 
        </div>
      </div>
    )
  }
}

EditProducts.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products,
})

export default connect(mapStateToProps, { getAllProducts })(withRouter(EditProducts));
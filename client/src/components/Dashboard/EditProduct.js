import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProduct } from '../../actions/productActions';


function checkValue(value) {
  return value ? value : "";
}
class EditProducts extends Component {
  constructor() {
    super();
    this.state = {
    //   allProducts: [],
      id: '',
      name: '',
      image: '',
      description: '',
      ingredients: '',
      price: '',
      weight:'',
      available: false,
      errors: {},
    };
  }

  componentWillMount() {
    this.setState({
      id: this.props.productData._id,
      name: this.props.productData.name,
      image: this.props.productData.image,
      description: this.props.productData.description,
      ingredients: this.props.productData.ingredients,
      price: this.props.productData.price,
      weight: this.props.productData.weight,
      available: this.props.productData.available,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: this.state.id,
      name: this.state.name,
      image: this.state.image,
      description: this.state.description,
      ingredients: this.state.ingredients,
      price: this.state.price,
      weight: this.state.weight,
      available: this.state.available,
    }
    this.props.updateProduct(updatedProduct, this.props.history);
  }

  onChange = (e, value) => {
    this.setState({[e.target.name]: value});
  }

  checkboxCheck = (e) => {
    this.setState({[e.target.name]: this.refs.availableCheck.checked});
  }

  checkboxValue = () => {
    return this.state.available ? "checked" : ""
  }

  render() {
    // const { products } = this.props.
    return (
      <div className="section">
        <div>
          <form onSubmit={this.onSubmit} key={this.props.key}>
            <div className="box" key={this.props.key} id={this.props.key}>
              <input className="input" type="text" name="name" value={this.state.name} onChange={e => this.onChange(e, e.target.value)}/>
              <input className="input" name="image" value={checkValue(this.state.image)} onChange={e => this.onChange(e, e.target.value)}/>
              <input className="input" name="description" value={checkValue(this.state.description)} onChange={e => this.onChange(e, e.target.value)}/>
              <input className="input" name="ingredients" value={checkValue(this.state.ingredients)} onChange={e => this.onChange(e, e.target.value)}/>
              <input className="input" name="price" value={checkValue(this.state.price)} onChange={e => this.onChange(e, e.target.value)}/>
              <input className="input" name="weight" value={checkValue(this.state.weight)} onChange={e => this.onChange(e, e.target.value)}/>
              <input className="checkbox" type="checkbox" name="available" checked={this.checkboxValue()} ref="availableCheck" onChange={this.checkboxCheck} />
              </div>
              <div className="field is-grouped">
              <div className="control">
                  <button className="button is-success is-link">Spara produkt</button>
              </div> 
            </div>
          </form>
        </div>
      </div>
    )
  }
}

EditProducts.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  // getAllProducts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products,
})

export default connect(mapStateToProps, { updateProduct })(withRouter(EditProducts));
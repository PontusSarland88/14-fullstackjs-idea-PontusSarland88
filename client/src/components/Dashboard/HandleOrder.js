import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateOrder, deleteOrder } from '../../actions/orderActions';
import './styles.css';

class HandleOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			active: false,
			userId: '',
			orderedProducts: {},
			customerName: '',
			street: '',
			zip: '',
			city: '',
			email: '',
			totalSum: '',
			date: '',
			errors: {},
		}
	}

	componentWillMount() {
		// console.log(this.props.orderData);
		this.setState({
			id: this.props.orderData._id,
			active: this.props.orderData.active,
			userId: this.props.orderData.userId,
			orderedProducts: this.props.orderData.orderedProducts,
			customerName: this.props.orderData.customerName,
			street: this.props.orderData.street,
			zip: this.props.orderData.zip,
			city: this.props.orderData.city,
			email: this.props.orderData.email,
			totalSum: this.props.orderData.totalSum,
			date: this.props.orderData.date,
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		const updatedOrder = {
			id: this.state.id,
			active: this.state.active,
			userId: this.state.userId,
			orderedProducts: this.state.orderedProducts,
			customerName: this.state.customerName,
			street: this.state.street,
			zip: this.state.zip,
			city: this.state.city,
			email: this.state.email,
			totalSum: this.state.totalSum,
			date: this.state.date,
		}
		this.props.updateOrder(updatedOrder, this.props.history);
	}

	onChange = (e, value) => {
    this.setState({[e.target.name]: value});
  }
  
  // deleteAOrder = (e) => {
  //   e.preventDefault();
  //   this.props.deleteOrder(this.state.id, this.props.history);
  // }
 
  changeActive= (e) => {
    if(this.state.active) {
      this.setState({
        active: false
      });
    } else {
      this.setState({
        active: true
      });
    }
  }

  render() {
    return (
      <div className="section">
			<div>
				<h3 className="title is-3">{this.state.customerName}'s order: </h3>
				<form onSubmit={this.onSubmit}>
					<div className="box">
						<input className="input" name="customerName" type="text" value={this.state.customerName} onChange={e => this.onChange(e, e.target.value)}></input>
						<input className="input" name="email" type="email" value={this.state.email} onChange={e => this.onChange(e, e.target.value)}></input>
						<input className="input" name="street" type="text" value={this.state.street} onChange={e => this.onChange(e, e.target.value)}></input>
						<input className="input" name="zip" type="text" value={this.state.zip} onChange={e => this.onChange(e, e.target.value)}></input>
						<input className="input" name="city" type="text" value={this.state.city} onChange={e => this.onChange(e, e.target.value)}></input>
						<h4 className="title is-4">Produkter: </h4>
						{this.state.orderedProducts.map((val, i) => {
							return (
								<div className="box" key={i}>
									<p>{val.productName}</p>
									<p>{val.price}</p>
									<p>{val.quantity}</p>
								</div>
							);
						})}
						<input className="input" name="price" value={this.state.totalSum} onChange={e => this.onChange(e, e.target.value)}></input>
						<div className="buttons has-addons is-rounded">
							<label className="label">Aktiv order: </label>
							<span className={this.state.active ? "button is-rounded is-success" : "button is-rounded"} onClick={(e) => this.changeActive(e)}>Ja</span>
							<span className={!this.state.active ? "button is-rounded is-danger" : "button is-rounded"} onClick={(e) => this.changeActive(e)}>Nej</span>
						</div>
						<div className="field is-grouped">
							<div className="control">
								<button className="button is-success is-link">Updatera order</button>
							</div>
							<div className="control">
									<button className="button is-danger is-link" onClick={e => this.deleteAProduct(e, this.state.id)}>Ta bort order</button>
							</div>  
						</div>
					</div>
				</form>
			</div>
      </div>
    )
  }
}

HandleOrder.protoTypes = {
	updateOrder: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	orders: state.orders
})

export default connect(mapStateToProps, { updateOrder })(withRouter(HandleOrder));

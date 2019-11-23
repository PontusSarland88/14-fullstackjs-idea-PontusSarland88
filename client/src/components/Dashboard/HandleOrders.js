import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllActiveOrders, getAllInactiveOrders } from '../../actions/orderActions';
import HandleOrder from './HandleOrder';

class HandleOrders extends Component {
  constructor() {
    super();
    this.state = {
      allActiveOrders: [],
      allInactiveOrders: [],
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getAllActiveOrders();
    this.props.getAllInactiveOrders();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allActiveOrders: nextProps.orders.orders,
      allInactiveOrders: nextProps.orders.inactiveOrders,
    });
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <h2 className="title is-2">Aktiva ordrar</h2>
        </div>
        <div>
          {this.state.allActiveOrders.length > 0 ? 
            this.state.allActiveOrders.map((val, i) => {
              return <HandleOrder key={i} orderData={val} />
            })
        :
            <p>Inga ordrar hittades</p>
          } 
        </div>
        <div className="container">
          <h2 className="title is-2">Inaktiva ordrar</h2>
        </div>
        <div>
          {this.state.allInactiveOrders.length > 0 ? 
            this.state.allInactiveOrders.map((val, i) => {
              return <HandleOrder key={i} orderData={val} />
            })
        :
            <p>Inga inaktiva ordrar hittades</p>
          } 
        </div>
      </div>
    )
  }
}

HandleOrders.propTypes = {
  getAllActiveOrders: PropTypes.func.isRequired,
  getAllInactiveOrders: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    orders: state.orders,
    inactiveOrders: state.inactiveOrders
})

export default connect(mapStateToProps, { getAllActiveOrders, getAllInactiveOrders })(withRouter(HandleOrders));
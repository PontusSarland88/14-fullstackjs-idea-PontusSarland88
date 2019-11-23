import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import 'bulma/css/bulma.css';
import 'bulma-extensions';
import 'bulma-switch';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AddProduct from './components/Dashboard/AddProduct';
import EditProducts from './components/Dashboard/EditProducts';
import EditUsers from './components/Dashboard/EditUsers';
import AddUser from './components/Dashboard/AddUser';
import HandleOrders from './components/Dashboard/HandleOrders';
import NewOrder from './components/Orders/NewOrder';
// import Navbar from './components/Navbar/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faEnvelope, faUser, faKey, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart, faEnvelope, faUser, faKey, faPlus, faMinus);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App Site">
          <Header />
          <main className="Site-content">
            <Route exact path="/" component={ Products }/>
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/dashboard" component={ Dashboard } />
              <Route exact path="/dashboard/add/product" component={ AddProduct } />
              <Route exact path="/dashboard/edit/products" component={ EditProducts } />
              <Route exact path="/dashboard/edit/users" component={ EditUsers } />
              <Route exact path="/dashboard/add/user" component={ AddUser } />
              <Route exact path="/dashboard/edit/orders" component={ HandleOrders } />
              <Route exact path="/neworder" component={ NewOrder } />
            </div>
          </main>
          <Footer />  
        </div>
      </Router>
    );
  }
}

export default App;

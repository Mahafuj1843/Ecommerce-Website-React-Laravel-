import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './layout/admin/Main';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Home from './components/frontend/Home';
import CartItemList from './components/frontend/CartItemList';
import ProductDetails from './components/frontend/ProductDetails';
import Checkout from './components/frontend/Checkout';
import MyAccounts from './components/frontend/MyAccounts';
import Dashboard from './components/admin/Dashboard';
import Category from './components/admin/Category';
import Brand from './components/admin/Brand';
import Product from './components/admin/Product';
import Order from './components/admin/Order';
import Order_details from './components/admin/Order_details';
import User from './components/admin/User';
import ForgetPassword from './components/frontend/auth/ForgetPassword';
import ResetPassword from './components/frontend/auth/ResetPassword';
import axios from 'axios';
// import Order_details from './components/admin/Order_details';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(function (config){
   const token = localStorage.getItem('auth_token');
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
});

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
          <Route exact path="/admin" component={Dashboard}/>
          <Route path="/admin/dashboard"  component={Main}/>
          <Route path="/admin/category"  component={Category}/>
          <Route path="/admin/brand"  component={Brand}/>
          <Route path="/admin/product"  component={Product}/>
          <Route path="/admin/order"  component={Order}/>
          <Route path="/admin/order-details-:orderID"  component={Order_details}/>
          <Route path="/admin/all-user"  component={User}/>

            <Route exact path="/" component={Home}/>
            <Route exact path="/cart-item" component={CartItemList}/>
            <Route exact path="/product-details-:id" component={ProductDetails}/>
            <Route exact path="/product-details" component={ProductDetails}/>
            <Route path="/login"  component={Login}/>
            <Route path="/register"  component={Register}/>
            <Route path="/forget-password"  component={ForgetPassword}/>
            <Route path="/reset-password"  component={ResetPassword}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/myAccounts" component={MyAccounts}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;

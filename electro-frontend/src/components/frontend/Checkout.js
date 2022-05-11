import React, { Component } from 'react';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Navber from '../../layout/frontend/Navber';
import Footer from '../../layout/frontend/Footer';
import '../../asset/frontend/css/checkout.css';

class Checkout extends Component {
    state = {
        cartItem: [],
        firstname: '',
        lastname: '',
        phone: '',
        street_address: '',
        village: '',
        state: '',
        city: '',
        paymentType: '',
        accountNo: '',
        amount: '',
        transactionID: '',
        error_list: []
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        axios.get(`/api/cart-item`).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    cartItem: res.data.CartItem
                })
            }
        });
    }

    shippingAddress = (e) => {
        e.preventDefault();
        axios.post(`/api/place-order`, this.state).then(res => {
            if (res.data.status === 200) {
                cogoToast.success(res.data.massage, { position: 'top-right' });
                this.props.history.push('/myAccounts');

                this.setState({
                    firstname: '',
                    lastname: '',
                    phone: '',
                    street_address: '',
                    village: '',
                    state: '',
                    city: '',
                    paymentType: '',
                    accountNo: '',
                    amount: '',
                    transactionID: ''
                });
            }
            else if(res.data.status === 402)
            {
                cogoToast.warn(res.data.massage, { position: 'top-right' });
            }
            else 
            {
                this.setState({
                    error_list: res.data.validation_errors
                });
            }
        });
    }

    render() {

        let subTotal = 0;
        let viewCartItem = this.state.cartItem.map((item) => {
            subTotal = subTotal + parseInt(item.total)
            return (
                <li key={item.id} class="list-group-item d-flex justify-content-between">
                    <div>
                        <h6>{item.product_name}</h6>
                        <span class="text-muted">Price: {item.price} BDT</span><br />
                        <span class="text-muted">Quantity: {item.quantity}</span>
                    </div>
                    <span class="text-muted my-auto">BDT {item.total}</span>
                </li>
            )
        })
        let Total = subTotal + 60;

        return (
            <div >
                <Navber />
                <div className="container align-self-center my-3">
                    <div className='row g-3'>
                        <div className="col-md-7 mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Shipping Address</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.shippingAddress}>
                                        <div className="row">
                                            <div class="col-6 mb-3">
                                                <label class="form-label" for="firstname">First Name</label>
                                                <input type="text" name="firstname" onChange={this.handleInput} value={this.state.fullname} id="firstname" class="form-control" />
                                                <span className="text-danger">{this.state.error_list.firstname}</span>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label class="form-label" for="lastname">Last name</label>
                                                <input type="text" name="lastname" onChange={this.handleInput} value={this.state.fullname} id="lastname" class="form-control" />
                                                <span className="text-danger">{this.state.error_list.lastname}</span>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label class="form-label" for="address">Phone No </label>
                                                <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} id="address" class="form-control" />
                                                <span className="text-danger">{this.state.error_list.phone}</span>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label class="form-label" for="address">Street Address </label>
                                                <input type="text" name="street_address" onChange={this.handleInput} value={this.state.street_address} id="address" class="form-control" />
                                                <span className="text-danger">{this.state.error_list.street_address}</span>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label class="form-label" for="address">Village </label>
                                                <input type="text" name="village" onChange={this.handleInput} value={this.state.village} id="address" class="form-control" />
                                                <span className="text-danger">{this.state.error_list.village}</span>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <label class="form-label" for="address">State </label>
                                                <input type="text" name="state" onChange={this.handleInput} value={this.state.state} id="address" class="form-control" />
                                                <span className="text-danger">{this.state.error_list.state}</span>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <label class="form-label" for="address">City </label>
                                                <select name="city" onChange={this.handleInput} value={this.state.city} id="division" className="form-control">
                                                    <option value="" selected disabled>--Select Division--</option>
                                                    <option value="Dhaka">Dhaka</option>
                                                    <option value="Chittgong">Chittgong</option><option value="other">Sylate</option>
                                                </select>
                                                <span className="text-danger">{this.state.error_list.city}</span>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <div>
                                                    <h6>Payment method:</h6>
                                                    <ul className="payment">
                                                        <input type="radio" className="toggle" name="paymentType" onChange={this.handleInput} value="0" /> Bkash <br />
                                                        <input type="radio" className="toggle" name="paymentType" onChange={this.handleInput} value="1" /> Nogod
                                                        <span className="text-danger">{this.state.error_list.paymentType}</span>
                                                        <li className="open">
                                                            <hr />
                                                            <div className="col-md-12 mb-3">
                                                                <label for="">Account no:</label>
                                                                <input type="text" name="accountNo" onChange={this.handleInput} value={this.state.accountNo} className="form-control" />
                                                                <span className="text-danger">{this.state.error_list.accountNo}</span>
                                                            </div>
                                                            <div className="col-md-12 mb-3">
                                                                <label for="">Amount:</label>
                                                                <input type="text" name="amount" onChange={this.handleInput} value={this.state.amount} className="form-control" />
                                                                <span className="text-danger">{this.state.error_list.accountNo}</span>
                                                            </div>
                                                            <div className="col-md-12 mb-3">
                                                                <label for="">Transaction id:</label>
                                                                <input type="text" name="transactionID" onChange={this.handleInput} value={this.state.transactionID} className="form-control" />
                                                                <span className="text-danger">{this.state.error_list.transactionID}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <hr className="mb-2" />
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-dark w-100">Place Order</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 my-5">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Order Summary</h4>
                                </div>
                                <div className="col-md-11 mt-3 mx-3">
                                    <ul class="list-group mb-3">
                                        {viewCartItem}
                                        <li class="list-group-item d-flex justify-content-between">
                                            <div>
                                                <h6 class="text-success">Subtotal (BDT)</h6>
                                                <h6 class="text-success">Delivery Charge (BDT)</h6>
                                            </div>
                                            <div >
                                                <h6 class="text-success">{subTotal}</h6>
                                                <h6 class="text-success float-end">60</h6>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <div>
                                                <h6>Total (BDT)</h6>
                                            </div>
                                            <span class="text-muted">{Total}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Checkout;
import React, { Component } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navber from '../../layout/admin/Navber';
import Slideber from '../../layout/admin/Slideber';
import Footer from '../../layout/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class Order_details extends Component {
    state = {
        orderItem: [],
        shipping: [],
        transaction: []
    }

    componentDidMount() {
        axios.get(`/api/order-details-${this.props.match.params.orderID}`).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    orderItem: res.data.OrderItem,
                    shipping: res.data.Shipping,
                    transaction: res.data.Transaction
                });
            }
        });
    }
    render() {

        let subTotal = 0, deliveryC = 60, total;
        let orderItemList = this.state.orderItem.map((item) => {
            subTotal = subTotal + item.total;
            return (
                <tr key={item.product_id}>
                    <th scope="row">{item.product_id}</th>
                    <td><img src={`http://localhost:8000/${item.product_image}`} style={{width : 45, height: 55} } alt={item.product_name}/></td>
                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total}</td>
                </tr>
            )
        });
        total = subTotal + deliveryC;

        return (

            <div className="sb-nav-fixed">
                <Navber />
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Slideber />
                        <section className="home-section">
                            <div className="home-content d-flex flex-column mx-2">
                                <div class="card m-2 w-100">
                                <div class="card-header d-flex justify-content-between"><span>Ordered Item</span>  <Link to="/admin/order" class="btn btn-success">All Order</Link></div>
                                    <div class="card-body">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product ID</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {orderItemList}
                                            </tbody>
                                        </table>
                                        <div>
                                            <h6 class="d-flex justify-content-between"><span>Subtotal</span><b>{subTotal}</b></h6>
                                            <h6 class="d-flex justify-content-between"><span>Tax</span><b>0.00</b></h6>
                                            <h6 class="d-flex justify-content-between"><span>Shipping</span><b>{deliveryC}</b></h6>
                                            <h6 class="d-flex justify-content-between"><span>total</span><b>{total}</b></h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card m-2 w-100">
                                    <div class="card-header">Shipping Details</div>
                                    <div class="card-body">
                                        <table class="table">
                                            <tr class="my-1">
                                                <th scope="col">Name</th>
                                                <td scope="col">{this.state.shipping.firstname} {this.state.shipping.lastname}</td>
                                                <th scope="col">Phone</th>
                                                <td scope="col">{this.state.shipping.phone}</td>
                                            </tr>
                                            <tr class="my-1">
                                                <th scope="col">Strret Address</th>
                                                <td scope="col">{this.state.shipping.street_address}</td>
                                                <th scope="col">Village</th>
                                                <td scope="col">{this.state.shipping.village}</td>
                                            </tr>
                                            <tr className="my-1">
                                                <th scope="col">State</th>
                                                <td scope="col">{this.state.shipping.state}</td>
                                                <th scope="col">City</th>
                                                <td scope="col">{this.state.shipping.city}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="card m-2 w-100">
                                    <div class="card-header">Transaction</div>
                                    <div class="card-body">
                                        <table class="table">
                                            <tr>
                                                <th scope="col">Transaction Type</th>
                                                <td scope="col">
                                                        {this.state.transaction.payment_type===0 ? 'Bkash' : 'Nogod'} 
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Account No</th>
                                                <td scope="col">{this.state.transaction.account_no}</td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Transaction ID</th>
                                                <td scope="col">{this.state.transaction.transactions_id}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <Footer />
                </div>
            </div>

        );
    };
}
export default Order_details;
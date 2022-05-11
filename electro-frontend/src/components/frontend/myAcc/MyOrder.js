import React, { Component, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert'
import { Link } from 'react-router-dom';


class MyOrder extends Component {
    state = {
        order: [],
        orderItem: [],
        shipping: [],
        transaction: []
    }

    componentDidMount() {
        axios.get(`/api/my-order`).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    order: res.data.Order
                })
            }
        });
    }

    orderDetails = (e, id) => {
        e.preventDefault();

        axios.get(`/api/order-details-${id}`).then(res => {
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

        let viewOrder = this.state.order.map((item) => {
            return (
                <tr key={item.id}>
                    <th >{item.id}</th>
                    <td>{item.subtotal}</td>
                    <td>{item.tax}</td>
                    <td>{item.total}</td>
                    <td>
                       {
                         item.status===0 ? <span class="badge bg-warning text-dark">Pending</span> :
                         item.status===1? <span class="badge bg-info text-dark">Orderde</span> :
                         item.status===2? <span class="badge bg-success">Delivery</span> :
                         <span class="badge bg-danger">Cancle</span>
                        }
                    </td>
                    <td>{item.order_date}</td>
                    <td>{item.delivery_date}</td>
                    <td>
                        <button type="button" onClick={(e) => this.orderDetails(e, item.id)} className="btn btn-info" data-bs-toggle="modal" data-bs-target="#OrderDetails">Details</button>
                    </td>
                    <td>
                        {item.status===2 ? '' : <button class="btn btn-danger">Cancle</button>}
                    </td>
                </tr>
            )
        });
        
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
            <div>
                <div class="card m-2 w-100">
                    <div class="card-header">All Order</div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">tax</th>
                                        <th scope="col">total</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Delivery Date</th>
                                        <th colspan="2" scope="col" class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewOrder}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="modal fade" id="OrderDetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div class="card my-1 w-100">
                                    <div class="card-header">Ordered Items</div>
                                    <div class="card-body">
                                        <div class="table-responsive">
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
                                        </div>
                                        <div>
                                            <h6 class="d-flex justify-content-between"><span>Subtotal</span><b>{subTotal}</b></h6>
                                            <h6 class="d-flex justify-content-between"><span>Tax</span><b>0.00</b></h6>
                                            <h6 class="d-flex justify-content-between"><span>Shipping</span><b>{deliveryC}</b></h6>
                                            <h6 class="d-flex justify-content-between"><span>total</span><b>{total}</b></h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="card my-2 w-100">
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
                                <div class="card my-1 w-100">
                                    <div class="card-header">Transaction</div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table">
                                                <tr>
                                                    <th scope="col">Transaction Type</th>
                                                    <td scope="col">{this.state.transaction.payment_type===0 ? 'Bkash' : 'Nogod'}</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    };
}

export default MyOrder;
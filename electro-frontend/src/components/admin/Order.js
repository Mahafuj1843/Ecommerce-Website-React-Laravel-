import React, { Component, useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import Navber from '../../layout/admin/Navber';
import Slideber from '../../layout/admin/Slideber';
import Footer from '../../layout/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class Order extends Component {
    state = {
        order: [],
        search: ''
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        axios.get(`/api/all-order`).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    order: res.data.Order
                })
            }
        });
    }

    orderStatus = (e, order_id, status) =>{
        e.preventDefault();
        const data = {
            order_id: order_id, 
            status: status
        }
        axios.post(`/api/update-order-status`, data).then(res => {
            if(res.data.status === 200)
            {
                cogoToast.success(res.data.massage, { position: 'top-right' });
                window.location.reload();
            }
        });
    }

    render() {
        let nav = this.state.order; 
        if(this.state.search.length > 0){
            nav = nav.filter((i)=> {
                return i.order_id.toString().match(this.state.search);
            })
        }

        let viewOrder = nav.map((item) => {
            return (
                <tr key={item.order_id}>
                    <th class="text-center">{item.order_id}</th>
                    <td class="text-center">{item.total}</td>
                    <td class="text-center">{item.username}</td>
                    <td class="text-center">{item.email}</td>
                    <td class="text-center">{item.mobile}</td>
                    <td class="text-center">{item.order_date}</td>
                    <td class="text-center">
                        {
                         item.status===0 ? <span class="badge bg-warning text-dark">Pending</span> :
                         item.status===1? <span class="badge bg-info text-dark">Orderde</span> :
                         item.status===2? <span class="badge bg-success">Delivery</span> :
                         <span class="badge bg-danger">Cancle</span>
                        }
                    </td>
                    <td class="text-center">{item.delivery_date}</td>
                    <td>
                        <Link as={Link} type="button" to={'/admin/order-details-'+item.order_id} className="btn btn-info">Details</Link>
                    </td>
                    <td>
                        <div class="btn-group" role="group">
                            <button id="btnGroupDrop1" type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Status
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                <li><a onClick = { (e) => this.orderStatus(e, item.order_id, 1)} class="dropdown-item" href="#">Ordered</a></li>
                                <li><a onClick = { (e) => this.orderStatus(e, item.order_id, 2)} class="dropdown-item" href="#">Delivered</a></li>
                                <li><a onClick = { (e) => this.orderStatus(e, item.order_id, 3)} class="dropdown-item" href="#">Canceled</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            )
        });

        return (

            <div className="sb-nav-fixed">
                <Navber />
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Slideber />
                        <section className="home-section">
                            <div className="home-content ">
                                <div class="card m-2 w-100">
                                    <div class="card-header d-flex align-items-center justify-content-between">All Order
                                        <form class="d-flex">
                                            <div class="autocomplete">
                                                <input autocomplete="off" name="search" onChange={this.handleInput} value={this.state.search} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            </div>
                                            <button class="btn btn-outline-success" type="submit">Search</button>
                                        </form><span></span>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="text-center">Order ID</th>
                                                    <th scope="col" class="text-center">total</th>
                                                    <th scope="col" class="text-center">Username</th>
                                                    <th scope="col" class="text-center">Email</th>
                                                    <th scope="col" class="text-center">Mobile</th>
                                                    <th scope="col" class="text-center">Order Date</th>
                                                    <th scope="col" class="text-center">Status</th>
                                                    <th scope="col" class="text-center">Delivery Date</th>
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
                        </section>

                    </div>
                    <Footer />
                </div>
            </div>

        );
    };
}
export default Order;
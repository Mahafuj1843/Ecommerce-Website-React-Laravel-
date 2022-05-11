import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Navber from '../../layout/frontend/Navber';
import Footer from '../../layout/frontend/Footer';
import '../../asset/frontend/css/navber.css';
import '../../asset/frontend/css/cartItemList.css';
import '../../asset/frontend/css/footer.css';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';

class CartItemList extends Component {

    constructor() {
        super();
        this.state = {
            cartItem: [],
        }
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

    ItemPlus = (id) => {
        const data = {
            id: id
        }
        axios.post(`/api/cart-item-plus`, data).then(res =>  {
            if (res.data === 1) {
                cogoToast.success("Item Quantity Increased", { position: 'top-right' });
                window.location.reload();
            } else {
                cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
            }
        })
    }

    ItemMinus = (id) => {
        const data = {
            id: id
        }
        axios.post(`/api/cart-item-minus`, data).then(res =>  {
            if (res.data === 1) {
                cogoToast.success("Item Quantity Decreased", { position: 'top-right' });
                window.location.reload();
            } else {
                cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
            }
        });
    }
    
    removeItem = (id) => {
        const data = {
             id: id
        }
        axios.post(`/api/cart-item-remove`, data).then(res =>  {
            if (res.data === 1) {
                cogoToast.success("Cart Item Remove", { position: 'top-right' });
                window.location.reload();
            } else {
                cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
            }
        });
    }


    render() {
        //if (!localStorage.getItem('token')) {
        //     return <Redirect to="/login" />
        // }
        let subTotal = 0;
        let viewCartItem = this.state.cartItem.map((item) => {
            subTotal = subTotal + parseInt(item.total)
            return (
                <tr key={item.id}>
                    <td class="text-center "><img className="cart-product-img" src={`http://localhost:8000/${item.image}`}/> </td>
                    <td class="text-left" colSpan={3}><h6>{item.product_name}</h6></td>
                    <td class="text-center">{item.price}$</td>
                    <td class="text-center"><div className="input-group">
                        <Button onClick={() => this.ItemMinus(item.id)} type="button" className="cbtn bx bx-minus "></Button>
                        <div className="form-control text-center">{item.quantity}</div>
                        <Button onClick={() => this.ItemPlus(item.id)} type="button" className="cbtn bx bx-plus  "></Button>
                    </div> </td>
                    <td class="text-center "><h6>{item.total}$</h6></td>
                    <td class="text-center">
                        <a className="btn" onClick={() => this.removeItem(item.id)} className="fa fa-trash "> </a>
                    </td>
                </tr>
            )
        }
        )
        const tax = 60;
        const total = subTotal + tax;

        return (
            <div>
                <Navber />
                <Fragment>
                    <Container  >
                        <div className="section-title text-center mb-55"><h2>Product Cart List</h2>
                        </div>
                        <Row className="d-flex justify-content-center">
                            <Col className="p-1" lg={10} md={7} sm={12} xs={12} >
                                <table class="table table-bordered cart-table bg-white">
                                    <thead>
                                        <tr>
                                            <th class="text-center rs-none">Image</th>
                                            <th class="text-left" colSpan={3}>Product Name</th>
                                            <th class="text-center rs-none">Price</th>
                                            <th class="text-center">Quantity</th>
                                            <th class="text-center">Total</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewCartItem}
                                    </tbody>
                                </table>
                                <div className=" total-price d-flex flex-column">
                                    <table>
                                        <tr>
                                            <td>Sub-Total:</td>
                                            <td>{subTotal} $</td>
                                        </tr>
                                        <tr>
                                            <td>Tax:</td>
                                            <td>{tax}</td>
                                        </tr>
                                        <tr>
                                            <td>Total:</td>
                                            <td>{total} $</td>
                                        </tr>
                                    </table>
                                    <Link to="/checkout" class=" btn btn-dark w-100">Checkout</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Fragment >
                <Footer />
            </div>
        )
    }

}

export default CartItemList
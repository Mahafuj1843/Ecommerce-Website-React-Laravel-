import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import axios from 'axios';
import cogoToast from 'cogo-toast';

class Navber extends Component {
  state = {
      search: '',
      product: [],
      cartCount: 0
    }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  logoutSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token', res.data.token);
        localStorage.removeItem('auth_name', res.data.username);
        cogoToast.success(res.data.massage, { position: 'top-right' });
        this.props.history.push('/');
      }
    });
  }

  componentDidMount() {
    axios.get(`/api/cart-count`).then((response) => {
      this.setState({ cartCount: response.data })

    });
    axios.get(`/api/view-product`).then(res => {
      this.setState({
        product: res.data.Product
      })
    });
  }

  render() {
    var authButton = '';
    if (!localStorage.getItem('auth_token')) {
      authButton = (
        <ReactBootStrap.Nav
          className="ms-auto my-2 my-lg-0 text-center"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <ReactBootStrap.Nav.Link as={Link} to="/login">Login</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Link as={Link} to="/register">Register</ReactBootStrap.Nav.Link>
        </ReactBootStrap.Nav>
      )
    } else {
      authButton = (
        <ReactBootStrap.NavDropdown title={localStorage.getItem('auth_name')} id="navbarScrollingDropdown">
          <ReactBootStrap.NavDropdown.Item as={Link} to="/myAccounts">My Account</ReactBootStrap.NavDropdown.Item>
          <ReactBootStrap.NavDropdown.Item as={Link} onClick={this.logoutSubmit}>Logout</ReactBootStrap.NavDropdown.Item>
        </ReactBootStrap.NavDropdown>
      )
    }

    let nav = this.state.product;
    if (this.state.search.length > 1) {
      nav = this.state.product;
      nav = nav.filter((i) => {
        return i.name.toLowerCase().match(this.state.search.toLowerCase());
      })
    } else {
      nav = [];
    }

    let searchProduct = nav.map((item) => {
      return (
        <Link as={Link}  key={item.id} to={'/product-details-'+item.id} className="d-flex border-bottom items divs">
          <img className=" me-2" style={{ width: 60, height: 60 }} src={`http://localhost:8000/${item.image}`} />
          <div className="d-flex flex-column" style={{ margin: 0 }}>
            <span className="fw-bold">{item.name}</span>
            <small className="text-muted">{item.description}</small>
            <small className="fw-bold text-danger">BDT: {item.selling_price} TAKA</small>
          </div>
        </Link>
      )
    });

    return (

      <ReactBootStrap.Navbar bg="primary" variant="dark" expand="lg" sticky="top" ClassName="navbar-light shadow d-flex justify-content-center">
        <ReactBootStrap.Container className="d-flex">
          <ReactBootStrap.Navbar.Brand href="/">Electro Mart</ReactBootStrap.Navbar.Brand>
          <div>
            <form autocomplete="off" action="" className="search-box">
              <div className="autocomplete">
                <input autocomplete="off" name="search" onChange={this.handleInput} value={this.state.search} class="search-input" type="text" placeholder="Search...." />
                <div class="autocomplete-items" style={{ top: '105%' }}>
                  {searchProduct}
                </div>
              </div>
              <button class="search-button"><i class="fa fa-search search-button" aria-hidden="true"></i></button>
            </form>
          </div>
          <ReactBootStrap.Navbar aria-controls="navbarScroll" />
          <ReactBootStrap.Navbar id="navbarScroll">
            <ReactBootStrap.Nav
              className="my-2 my-lg-0 text-center ms-auto"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link type="button" as={Link} to="/cart-item" className="btn position-relative pt-2 ms-auto me-1">
                <i class="fas fa-shopping-cart" style={{ fontSize: '20px', color: 'white' }}></i>
                <span class="position-absolute mt-1 top-0 start-95 translate-middle badge rounded-pill bg-secondary">
                  {this.state.cartCount}
                </span>
              </Link>
              {authButton}
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar>
        </ReactBootStrap.Container>
      </ReactBootStrap.Navbar>
    );
  };
}

export default Navber;
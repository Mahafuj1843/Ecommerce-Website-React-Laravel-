import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert'

function Navber(){

  const history = useHistory();
  const logoutSubmit = (e) =>{
    axios.post('/api/logout').then(res => {
      if(res.data.status === 200)
      {
          localStorage.removeItem('auth_token',res.data.token);
          localStorage.removeItem('auth_name',res.data.username);
          swal("Success",res.data.massage,"success");
          history.push('/');
      }
    });
  }

    return (
      <ReactBootStrap.Navbar bg="dark" variant="dark" expand="lg" sticky="top"  ClassName="navbar-dark shadow py-3">
        <ReactBootStrap.Container fluid className="mx-3">
          <ReactBootStrap.Navbar.Brand href="#">Electro Mart</ReactBootStrap.Navbar.Brand>
          <nav class="nav-bg">
          <div class="nav-content">
            <i class='bx bx-menu' ></i>
          </div>
        </nav>
          <ReactBootStrap.Navbar.Collapse id="navbarScroll">
          
            <ReactBootStrap.Nav
              className="ms-auto my-2 my-lg-0 text-center"
              style={{ maxHeight: '100px', marginRight: '4rem' }}
              navbarScroll
            >
              <ReactBootStrap.Nav.Link className="mx-auto" as={Link} to="/">Home</ReactBootStrap.Nav.Link>
              <ReactBootStrap.NavDropdown title={localStorage.getItem('auth_name')} id="navbarScrollingDropdown">
              <ReactBootStrap.NavDropdown.Item as={Link} to="/myAccounts">My Account</ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item as={Link} onClick={logoutSubmit}>Logout</ReactBootStrap.NavDropdown.Item>
              </ReactBootStrap.NavDropdown>
                 
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Container>
    </ReactBootStrap.Navbar>
        
    );
}

export default Navber;
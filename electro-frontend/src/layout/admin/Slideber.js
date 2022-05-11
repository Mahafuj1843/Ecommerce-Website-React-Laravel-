import React from 'react';
import {Link} from 'react-router-dom';

const Slideber = () =>{
    return (
        <div className="sidebar">
    <ul className="nav-links">
      <li>
        <a href="#">
          <i className='bx bx-grid-alt' ></i>
          <span className="link_name">Dashboard</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#">Category</a></li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i className='bx bx-collection' ></i>
            <span className="link_name">Category</span>
          </a>
          <i className='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">Category</a></li>
          <li><Link to="/admin/category">All Category</Link></li>
          <li><a href="#">Add Category</a></li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i className='bx bx-book-alt' ></i>
            <span className="link_name">Brands</span>
          </a>
          <i className='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">Brands</a></li>
          <li><Link to="/admin/brand">All Brands</Link></li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i className='bx bx-book-alt' ></i>
            <span className="link_name">Product</span>
          </a>
          <i className='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">Product</a></li>
          <li><Link to="/admin/product">All Product</Link></li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i className='bx bx-book-alt' ></i>
            <span className="link_name">Orders</span>
          </a>
          <i className='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">Orders</a></li>
          <li><Link to="/admin/order">All Order</Link></li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i className='bx bx-book-alt' ></i>
            <span className="link_name">Users</span>
          </a>
          <i className='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">Users</a></li>
          <li><Link to="/admin/all-user">User</Link></li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i className='bx bx-cog' ></i>
          <span className="link_name">Setting</span>
        </a>
        <ul className="sub-menu blank">
          <li><a className="link_name" href="#">Setting</a></li>
        </ul>
      </li>
    </ul>
  </div>
    );
}

export default Slideber;
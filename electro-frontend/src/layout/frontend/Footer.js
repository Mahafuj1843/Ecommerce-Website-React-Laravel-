import React from 'react';
import {Link} from 'react-router-dom';


function Footer(){
    return (
      <footer className="footer--light">
          <div className="footer-big">
            <div className="container">
              <div className="row">
                  <div className="col-lg-3 col-sm-6 small">
                      <div className="footer-widget">
                      <div className="widget-about">
                        <div className="footer-menu">
                          <h4 className="footer-widget-title">Contact Us</h4>
                          <ul className="contact-details">
                              <li>
                                <i className="fa fa-phone"></i> 
                                <Link to="#" className="a">+0011-26242628</Link>
                              </li>
                              <li>
                                <i className="fa fa-envelope-open"></i>
                                <Link to="#" className="a">electromart@gmail.com</Link>
                              </li>
                              <li>
                                  <i className="fa fa-map-marker"></i>
                                  <Link to="#" className="a">Chittagong, Bangladesh</Link>
                                </li>
                            </ul>
                        </div>
                      </div>
                      </div>
                    </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="footer-widget">
                    <div className="footer-menu">
                      <h4 className="footer-widget-title">Category</h4>
                      <ul>
                        <li>
                          <Link to="#" className="a">Mobile</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">Laptop</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">Watch</Link>
                        </li>
                        <li>
                          <a to="#" className="a">Other</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="footer-widget">
                    <div className="footer-menu">
                      <h4 className="footer-widget-title">Our Company</h4>
                      <ul>
                        <li>
                          <Link to="#" className="a">About Us</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">How It Works</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">Plan & Pricing</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">Blog</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="footer-widget">
                    <div className="footer-menu p-0">
                      <h4 className="footer-widget-title">Help Support</h4>
                      <ul>
                        <li>
                          <Link to="#" className="a">Support Forum</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link to="#" className="a">Support Policy</Link>
                        </li> 
                        <li>
                          <Link to="#" className="a">FAQs</Link>
                        </li> 
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="f-icon-footer">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="social_icon d-flex">
                      <Link to="" className="a"><i className="fa fa-facebook-square"></i></Link>
                      <Link to="" className="a"><i className="fa fa-twitter-square"></i></Link> 
                      <Link to="" className="a"><i className="fa fa-instagram"></i></Link>
                      <Link to="" className="a"><i className="fa fa-linkedin-square"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          <div className="mini-footer">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="copyright-text">
                    <p>© 2021
                      <Link to="#" className="a"> Electro Mart</Link>. All rights reserved. Created by 
                      <Link to="#" className="a"> MaEBa.</Link>
                    </p>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          </footer>

    );
}

export default Footer;
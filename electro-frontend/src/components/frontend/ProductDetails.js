import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Navber from '../../layout/frontend/Navber';
import Footer from '../../layout/frontend/Footer';
import '../../asset/frontend/css/navber.css';
import '../../asset/frontend/css/productDetails.css';
import '../../asset/frontend/css/footer.css';
import cogoToast from 'cogo-toast';

class ProductDetails extends Component {

     constructor(props) {
          super(props);
     }
     state = {
          product_details: [],
          ReviewData: [],
          quantity: ''
     }
     handleInput = (e) =>{
          this.setState({
              [e.target.name]: e.target.value
          });
       }
     componentDidMount() {
          let isMounted = true;
          axios.get(`/api/product-details-${this.props.match.params.id}`).then(res => {
               if (isMounted) {
                    if (res.data.status === 200) {
                         this.setState({
                              product_details: res.data.Product
                         });
                    }
               }
          });

          axios.get(`/api/reviewlist-${this.props.match.params.id}`).then(res => {
               if (res.data.status === 200) {
                     this.setState({ ReviewData:res.data.Review });
                 }
             });
     }

     addToCart = (e, id) =>{
          e.preventDefault();
          const data = {
               product_id: id,
               product_price: this.state.product_details.selling_price,
               product_qty: this.state.quantity
          }
          // const thisClicked = e.currentTarget;
          // thisClicked.innerText = "Deleting..";
          axios.post(`/api/add-to-cart`, data).then(res => {
              if(res.data.status === 401)
              {
                  cogoToast.warn(res.data.massage, { position: 'top-right' })
              }else if(res.data.status === 403){
               cogoToast.warn(res.data.massage, { position: 'top-right' });
              }else if(res.data.status === 402){
               cogoToast.warn(res.data.massage, { position: 'top-right' });
              }else{
               cogoToast.success(res.data.massage, { position: 'top-right' });
               window.location.reload();
              }
          });
      }


     render() {
          // let review;
          // if (this.state.ReviewData) {
               let review = this.state.ReviewData.map((item) => {
                    return (
                         <div key={item.id}>
                              <p className=" p-0 m-0">{item.fullname}</p>
                             <p>{item.review}</p>
                         </div>
                    )
                    // if (i.ratting === 1) {
                    //      return <div>
                    //          <p className=" p-0 m-0"><span className="Review-Title">{i.fullname}</span> <span className="text-success"><i className="fa fa-star"></i> </span> </p>
                    //          <p>{i.review}</p>
                    //      </div>
                    //  }
                    //  else if (i.ratting === 2) {
                    //      return <div>
                    //          <p className=" p-0 m-0"><span className="Review-Title">{i.fullname}</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i>   </span> </p>
                    //          <p>{i.review}</p>
                    //      </div>
                    //  }
                    //  else if (i.ratting === 3) {
                    //      return <div>
                    //          <p className=" p-0 m-0"><span className="Review-Title">{i.fullname}</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                    //          <p>{i.review}</p>
                    //      </div>
                    //  }
                    //  else if (i.ratting === 4) {
                    //      return <div>
                    //          <p className=" p-0 m-0"><span className="Review-Title">{i.fullname}</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                    //          <p>{i.review}</p>
                    //      </div>
                    //  }
                    //  else{
                    //      return <div>
                    //          <p className=" p-0 m-0"><span className="Review-Title">{i.fullname}</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i><i className="fa fa-star"></i> </span> </p>
                    //          <p>{i.review}</p>
                    //      </div>
                    //  } 
               });
          // }else{
          //      return (
          //           <div>
          //               <h6 className="mt-2">REVIEWS</h6>
          //               <p>There have no review Yet </p>
          //           </div>
          //       )
          // }

          return (
               <div>
                    <Navber />
                    <Fragment>
                         <Container fluid={true} className="BetweenTwoSection">
                              <Row className="p-2">
                                   <Col className="bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                                        <Row>
                                             <Col className="p-3 d-flex justify-content-center flex-column" md={6} lg={6} sm={12} xs={12}>
                                                  <img className="align-self-center" style={{ height: '450px', width: '350px' }} src={`http://localhost:8000/${this.state.product_details.image}`} />
                                             </Col>
                                             <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                                                  <h5 className="Product-Name">{this.state.product_details.name}</h5>
                                                  <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like Some Of Our Exclusive Collectio</h6>
                                                  <div className="input-group">
                                                       <div className="Product-price-card d-inline me-1">Regular Price: {this.state.product_details.original_price}</div>
                                                       <div className="Product-price-card d-inline me-1">Price: {this.state.product_details.selling_price}</div>
                                                       <div className="Product-price-card d-inline me-1">Status: {this.state.product_details.quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
                                                  </div>
                                                  <h6 className="mt-2">Choose Color</h6>
                                                  <div className="input-group">
                                                       <div className="form-check mx-1">
                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                            <label className="form-check-label" htmlFor="exampleRadios1">Black</label>
                                                       </div>
                                                       <div className="form-check mx-1">
                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                            <label className="form-check-label" htmlFor="exampleRadios1">Green</label>
                                                       </div>
                                                       <div className="form-check mx-1">
                                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                                            <label className="form-check-label" htmlFor="exampleRadios1">Red</label>
                                                       </div>
                                                  </div>
                                                  <h6 className="mt-2">Quantity</h6>
                                                  <input type="number" name='quantity' onChange={this.handleInput} value={this.state.c_id} className="form-control text-center w-50"/>
                                                  {this.state.product_details.quantity > 0 ?
                                                       <div className="input-group mt-3">
                                                            <button onClick = { (e) => this.addToCart(e, this.state.product_details.id)} className="btn site-btn m-1 "> <i className="fa fa-shopping-cart"></i>  Add To Cart</button>
                                                            <button  className="btn btn-primary m-1"> <i className="fa fa-car"></i> Order Now</button>
                                                       </div> : ''
                                                  }
                                             </Col>
                                        </Row>
                                        <Row>
                                             <Col className="" md={6} lg={6} sm={12} xs={12}>
                                                  <h6 className="mt-2">DETAILS</h6>
                                                  <p>{this.state.product_details.description}</p>
                                                  {/* <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation</p> */}
                                             </Col>

                                             <Col className="" md={6} lg={6} sm={12} xs={12}>
                                                  <h6 className="mt-2">REVIEWS</h6>
                                                  {review}
                                                  {/* <div>
                                                  <p className=" p-0 m-0"><span className="Review-Title">Kazi Ariyan</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                                                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

                                                  </div> */}
                                                  {/* <p className=" p-0 m-0"><span className="Review-Title">Kazi Ariyan</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                                                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

                                                  <p className=" p-0 m-0"><span className="Review-Title">Kazi Ariyan</span> <span className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </span> </p>
                                                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>  */}

                                             </Col>
                                        </Row>

                                   </Col>
                              </Row>
                         </Container>

                    </Fragment>
                    <Footer />
               </div>
          );
     };
}

export default ProductDetails;
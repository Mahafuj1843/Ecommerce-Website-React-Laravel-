import React, { Component, Fragment } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../../asset/frontend/css/home.css';

class ProductView extends Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this)
    }
    state = {
        cat_list: [],
        category_id: '',
        product_list: []
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }


    componentDidMount(){
        axios.get(`/api/view-product-${this.props.cat_id}`).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    product_list: res.data.Product
                });
            }
        });
    }
    
    // categoryProduct = (c_id) => {
    //     var previous_c_id;
    //     if(c_id === previous_c_id){
    //         return
    //     }
    //     axios.get(`/api/view-product-${c_id}`).then(res => {
    //         if (res.data.status === 200) {
    //             this.setState({
    //                 product_list: res.data.Product
    //             });
    //         }
    //     });
    //     previous_c_id = c_id;
    // }

    render() {
        let productList = this.state.product_list;

        var settings = {
            spacebetween: 10,
            loop: true,
            centeredslides: true,
            dots: false,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <Fragment key={this.props.cat_id}>
                {/* {this.categoryProduct(this.props.cat_id)} */}
                <ReactBootStrap.Container className="text-center" >
                    <div className="section-title text-center mb-55"><h2>{this.props.cat_name} &nbsp;
                        <a className="btn btn-sm ml-2 site-btn" onClick={this.previous} ><i className="fa fa-angle-left"></i></a>
                        &nbsp;
                        <a className="btn btn-sm ml-2 site-btn" onClick={this.next} ><i className="fa fa-angle-right"></i></a>
                    </h2>
                        <p>Some Of Our Exclusive Collection, You May Like</p>
                    </div>
                    <ReactBootStrap.Row>
                        <Slider ref={c => (this.slider = c)} {...settings}>

                            {
                                productList.map((product) => {
                                    return (
                                        <div key={product.id}>
                                            <Link to={'/product-details-'+product.id} style={{ textDecoration : "none"} }>
                                            <ReactBootStrap.Card className="image-box card">
                                                <img className="center mt-2" src={`http://localhost:8000/${product.image}`} />
                                                <ReactBootStrap.Card.Body>
                                                    <div className="d-flex justify-content-center flex-column">
                                                        <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                                        <small className="product-name-on-card">{product.name}</small>
                                                        <small className="product-price-on-card">{product.selling_price}</small>
                                                    </div>
                                                </ReactBootStrap.Card.Body>
                                            </ReactBootStrap.Card>
                                            </Link>
                                        </div>

                                    )
                                })
                            }

                            {/* <div>
                                <ReactBootStrap.Card className="image-box card">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/k7z3afk0/watch/t/c/x/lcs-8188-lois-caron-original-imafq3k9ztzdkyhe.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <div className="d-flex justify-content-center flex-column">
                                            <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                            <small className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</small>
                                            <small className="product-price-on-card">Price : $110</small>
                                        </div>
                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div> */}
                            {/* <div>
                                <ReactBootStrap.Card className="image-box card">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/jeka07k0/watch/4/p/y/38024pp25-fastrack-original-imaf37n5df3bn52n.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <div className="d-flex justify-content-center flex-column">
                                            <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                            <small className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</small>
                                            <small className="product-price-on-card">Price : $120</small>
                                        </div>
                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div>
                            <div>
                                <ReactBootStrap.Card className="image-box card">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/kka1si80/watch/4/t/k/tw-02524-teenager-luxurious-fashion-silicone-black-colored-led-original-imafznht7bzfmj7d.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <div className="d-flex justify-content-center flex-column">
                                            <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                            <small className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</small>
                                            <small className="product-price-on-card">Price : $130</small>
                                        </div>
                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div>
                            <div>
                                <ReactBootStrap.Card className="image-box card">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/jw0zr0w0/watch/c/u/r/ls2811-limestone-original-imafgrxqf8qvecjd.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <div className="d-flex justify-content-center flex-column">
                                            <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                            <small className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</small>
                                            <small className="product-price-on-card">Price : $130</small>
                                        </div>
                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div>
                            <div>
                                <ReactBootStrap.Card className="image-box card">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/jcxoya80/watch/z/n/h/skmei-sports-multifunctional-dual-time-digital-blue-dial-men-s-original-imaffykneyfryvqh.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <div className="d-flex justify-content-center flex-column">
                                            <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                            <small className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</small>
                                            <small className="product-price-on-card">Price : $130</small>
                                        </div>
                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div>
                            <div>
                                <ReactBootStrap.Card className="image-box card">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/kpodocw0/watch/p/l/t/anlg-428-blue-blu-analogue-original-imag3uxbhfkyhahf.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <div className="d-flex justify-content-center flex-column">
                                            <p className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> </p>
                                            <small className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</small>
                                            <small className="product-price-on-card">Price : $130</small>
                                        </div>
                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div>

                            <div>
                                <ReactBootStrap.Card className="image-box card mx-3">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/k48rwcw0/watch/k/v/f/lcs-8190-lois-caron-original-imafn7fsyttnpybp.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <p className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</p>
                                        <p className="product-price-on-card">Price : $120</p>

                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div>
                            <div>
                                <ReactBootStrap.Card className="image-box card mx-3">
                                    <img className="center mt-2" src="https://rukminim1.flixcart.com/image/800/960/ke353m80-0/watch/e/b/s/fresh-new-arrival-latest-men-watch-watches-men-ghadi-gents-boys-original-imafuupqgaanhtxu.jpeg?q=50" />
                                    <ReactBootStrap.Card.Body>
                                        <p className="product-name-on-card">Realme C21 (Cross Black, 64 GB)</p>
                                        <p className="product-price-on-card">Price : $120</p>

                                    </ReactBootStrap.Card.Body>
                                </ReactBootStrap.Card>
                            </div> */}
                        </Slider>
                    </ReactBootStrap.Row>
                </ReactBootStrap.Container>
            </Fragment>

        );
    };
}

export default ProductView;
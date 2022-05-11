import React, { Component } from 'react';
import axios from 'axios';
import ProductView from './Home/ProductView';
import Navber from '../../layout/frontend/Navber';
import Footer from '../../layout/frontend/Footer';
import '../../asset/frontend/css/navber.css';
import '../../asset/frontend/css/home.css';
import '../../asset/frontend/css/footer.css';

class Home extends Component {

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
  componentDidMount() {
    axios.get('/api/active-category').then(res => {
      if (res.data.status === 200) {
        this.setState({
          cat_list: res.data.Category
        });
      }
    });
  }

  render() {
    let categoryList = this.state.cat_list;

    return (
      <div>
        <Navber />
        {
          categoryList.map((category) => {
            return (
              <ProductView cat_id={category.id} cat_name={category.c_name} />
            )
          })
        }
        <Footer />
      </div>
    );
  };
}

export default Home;
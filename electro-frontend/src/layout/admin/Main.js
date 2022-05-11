import React from 'react';
import Navber from './Navber';
import Slideber from './Slideber';
import Footer from './Footer';
import '../../asset/admin/css/style.css';
import '../../asset/admin/js/scripts';

const Main = () =>{
    return (
        <div class="sb-nav-fixed">
            <Navber />
            <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <Slideber/>
                  <section class="home-section">
                    <div class="home-content">
                      <span class="text">Dashboard</span>
                    </div>
                  </section>
              </div>

                      <Footer/>
            </div>
        </div>
        
    );
}

export default Main;
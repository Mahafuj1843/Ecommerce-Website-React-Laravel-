import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navber from '../../../layout/frontend/Navber';
import Footer from '../../../layout/frontend/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class ForgetPassword extends Component{

    state={
        email:'',
        message:''
   }

    // Forget Form Submit 
    formSubmit = (e) =>{
        e.preventDefault();
        const data={
             email:this.state.email                
        }

        axios.post('/api/forget-password',data)
           .then((response) => { 
              this.setState({message:response.data.message})
              document.getElementById("forgetform").reset();
           })
           .catch((error) => {
             this.setState({message:error.response.data.message})
           });
   }

    render(){

        return (
            <div>
                <Navber/>
            <div className="container my-3">
                <form onSubmit={this.formSubmit}>
                    <div className="row justify-content-center">
                            <div className="col-md-6">
                            <h4 className="my-2 text-center">Forget Password</h4>
                                <div class="my-3">
                                    <label for="customerEmail"  class="form-label">Email <span class="text-danger">*</span></label>
                                    <input type="email" name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} class="form-control" placeholder="Enter Email.." />
                                    <span className="text-danger">{this.state.message}</span>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Forget Password</button>
                                </div>
                            </div>
                    </div>
                </form>
            </div>
            <Footer/>
            </div>

        );
    };
}
export default ForgetPassword;
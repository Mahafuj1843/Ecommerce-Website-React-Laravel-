import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navber from '../../../layout/frontend/Navber';
import Footer from '../../../layout/frontend/Footer';
import axios from 'axios';
import swal from 'sweetalert'
 
class ResetPassword extends Component {
     state = {
          token: '',
          email: '',
          password: '',
          password_confirmation: '',
          message: ''
     }
 
     // Reset Form Submit 
     formSubmit = (e) => {
          e.preventDefault();
          const data = {
               token: this.state.token,
               email: this.state.email,
               password: this.state.password,
               password_confirmation: this.state.password_confirmation
          }
 
          axios.post('/api/reset-password', data)
               .then((response) => {
                    this.setState({ message: response.data.message })
                    document.getElementById("formsubmit").reset();
               })
               .catch((error) => {
                    this.setState({ message: error.response.data.message })
               });
     }
 
     render() {
 
          /// Show Error Message 
          let error = "";
          if (this.state.message) {
               error = (
                    <div>
                         <div class="alert alert-danger" role="alert" >
                              {this.state.message}
                         </div>
                    </div>
               )
          } // end error message 
 
 
          return (
            <div>
                <Navber/>
            <div className="container my-3">
                <form onSubmit={this.formSubmit}>
                    <div className="row justify-content-center">
                            <div className="col-md-6">
                            <h4 className="my-2 text-center">Reset Account Password</h4>
                                <div class="my-3">
                                    <label for="customerEmail"  class="form-label">Pin Code <span class="text-danger">*</span></label>
                                    <input type="text"name="token" onChange={(e) => { this.setState({ token: e.target.value }) }} class="form-control" placeholder="Enter Pin Code" />
                                    <span className="text-danger">{this.state.message}</span>
                                </div>
                                <div class="my-3">
                                    <label for="customerEmail"  class="form-label">Email <span class="text-danger">*</span></label>
                                    <input type="email" name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} class="form-control" placeholder="Enter Email.." />
                                    <span className="text-danger">{this.state.message}</span>
                                </div>
                                <div class="my-3">
                                    <label for="customerEmail"  class="form-label">New Password <span class="text-danger">*</span></label>
                                    <input type="password" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} class="form-control" placeholder="Enter New Password." />
                                    <span className="text-danger">{this.state.message}</span>
                                </div>
                                <div class="my-3">
                                    <label for="customerEmail"  class="form-label">Confirm Password <span class="text-danger">*</span></label>
                                    <input type="password" name="password_confirmation" onChange={(e) => { this.setState({ password_confirmation: e.target.value }) }} class="form-control" placeholder="Enter Confirm Password" />
                                    <span className="text-danger">{this.state.message}</span>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Reset Password</button>
                                </div>
                            </div>
                    </div>
                </form>
            </div>
            <Footer/>
            </div>

        );
     }
}
 
export default ResetPassword;
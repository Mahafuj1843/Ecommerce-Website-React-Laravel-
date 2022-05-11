import React, { Component } from 'react';
import Navber from '../../../layout/frontend/Navber';
import Footer from '../../../layout/frontend/Footer';
import axios from 'axios';
import swal from 'sweetalert'


class Register extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        error_list: []
    }
    handleInput = (e) =>{
       this.setState({
           [e.target.name]: e.target.value
       });
    }
    registerSubmit = (e) =>{
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', this.state).then(res => {
               if(res.data.status === 200)
               {
                   localStorage.setItem('auth_token',res.data.token);
                   localStorage.setItem('auth_id',res.data.userid);
                   localStorage.setItem('auth_name',res.data.username);
                   swal("Success",res.data.massage,"success");
                   this.props.history.push('/');
                    this.setState({
                        name: '',
                        email: '',
                        password: ''
                    });
               }
               else{
                this.setState({
                    error_list: res.data.validation_errors
                  });    
               }
            });
        });
    }

    render(){
        return (
            <div>
                <Navber/>
                <div className="container mb-3">
            <h4 className="my-2">Create New Customer Account</h4>
                <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h6 className="my-3">Personal Information</h6>
                            <form onSubmit={this.registerSubmit}>
                                <div class="my-3">
                                    <label for="customerName" class="form-label">Username <span class="text-danger">*</span></label>
                                    <input type="text" name="name" onChange={this.handleInput} value={this.state.name} class="form-control" placeholder="Enter Name.."/>
                                    <span className="text-danger">{this.state.error_list.name}</span>
                                </div>
                                <div class="my-3">
                                    <label for="customerEmail"  class="form-label">Email <span class="text-danger">*</span></label>
                                    <input type="email" name="email" onChange={this.handleInput} value={this.state.email} class="form-control" placeholder="Enter Email.." />
                                    <span className="text-danger">{this.state.error_list.email}</span>
                                </div>
                                <div class="my-3">
                                    <label for="customerPass" class="form-label">Password <span class="text-danger">*</span></label>
                                    <input type="password" name="password" onChange={this.handleInput} value={this.state.password} class="form-control" placeholder="Enter Password.." />
                                    <span className="text-danger">{this.state.error_list.password}</span>
                                </div>
                                <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">CREATE AN ACCOUNT</button>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
            <Footer/>
            </div>
            
        );
    }
}

export default Register;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navber from '../../../layout/frontend/Navber';
import Footer from '../../../layout/frontend/Footer';
import axios from 'axios';
import cogoToast from 'cogo-toast';

class Login extends Component{
    state = {
        email: '',
        password: '',
        error_list: []
    }
    handleInput = (e) =>{
       this.setState({
           [e.target.name]: e.target.value
       });
    }

    loginSubmit = (e) =>{
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', this.state).then(res => {
               if(res.data.status === 200)
               {
                   localStorage.setItem('auth_token',res.data.token);
                   localStorage.setItem('auth_id',res.data.userid);
                   localStorage.setItem('auth_name',res.data.username);
                   cogoToast.success(res.data.massage, { position: 'top-right' });
                   if(res.data.role_as === 1){
                    this.props.history.push('/admin/dashboard');
                   }else{
                    this.props.history.push('/');
                   }
                    this.setState({
                        email: '',
                        password: ''
                    });
               }
               else if(res.data.status === 201)
               {
                cogoToast.warn(res.data.massage, { position: 'top-right' });
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
            <h4 className="my-2">Customer Login</h4>
                <form onSubmit={this.loginSubmit}>
                    <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h6 className="my-3">Registered Customers</h6>
                                If you have an account, sign in with your email address.
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
                                    <button type="submit" class="btn btn-primary">LOGIN</button>
                                </div>
                                <Link to="/forget-password" class="small my-2" style={{ cursor: 'pointer',textDecoration: "none", color:'black' }}>Forgot Your Password?</Link>
                            </div>
                    </div>
                </form>
            </div>
            <Footer/>
            </div>
            
        );
    };
}

export default Login;
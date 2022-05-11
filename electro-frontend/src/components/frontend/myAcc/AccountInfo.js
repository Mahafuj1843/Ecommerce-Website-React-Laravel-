import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import swal from 'sweetalert'


class  AccountInfo extends Component{
    state = {
        id: localStorage.getItem('auth_id'),
       user: [],
       name: '',
       email: '',
       current_password: '',
       new_password: '',
       error_list: []
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
     }

     changePassword= (e) =>{
        e.preventDefault();
            axios.post(`/api/change-password-${this.state.id}`, this.state).then(res => {
               if(res.data.status === 200)
               {
                   swal("Success",res.data.massage,"success");
                    this.setState({
                        current_password: '',
                        new_password: '',
                    });
               }
               else if(res.data.status === 201)
               {
                    swal("Warning",res.data.massage,"warning");
               }
               else{
                    this.setState({
                        error_list: res.data.validation_errors
                    });    
               }
            });
     }
    
    //show profile 1nd part
    fetchUserProfile = () =>{
        axios.get(`/api/user-profile-${this.state.id}`).then(res => {
            if(res.data.status === 200)
            {
                this.setState({
                    user: res.data.user
            })
            this.state.user.map((item) => {
                this.setState({
                    name: item.name,
                    email: item.email
                 })
            })
          }
        });
    }
    componentDidMount() {
        this.fetchUserProfile();
    }
    render(){  
        return (  
                <div className="col-md-12">
                    <div class="d-flex mt-5">
                        <div class="col-md-6">
                        <h6>Account Information</h6><hr/>
                            <div class=" mb-3">
                                <label for="">Username</label>
                                <input type="text" name="name" onChange={this.handleInput} value={this.state.name} disabled class="form-control" />
                            </div>
                            <div class=" mb-3">
                                <label for="">Email</label>
                                <input type="email" name="email" onChange={this.handleInput} value={this.state.email} disabled class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6 ms-4">
                        <form onSubmit={this.changePassword}>
                            <h6>Change Password</h6><hr/>
                                <div class=" mb-3">
                                    <label for="">Current Password</label>
                                    <input type="password" name="current_password" onChange={this.handleInput} value={this.state.current_password} class="form-control"/>
                                    <span className="text-danger">{this.state.error_list.current_password}</span>
                                </div>
                                <div class=" mb-3">
                                    <label for="">New Password</label>
                                    <input type="password" name="new_password" onChange={this.handleInput} value={this.state.new_password} class="form-control" />
                                    <span className="text-danger">{this.state.error_list.new_password}</span>
                                </div>
                                <div class=" mb-3">
                                <button type="submit" class="btn btn-primary w-100">Save</button>
                                </div>
                        </form>
                        </div>
                    </div>
                </div>
        );
    };
}

export default AccountInfo;
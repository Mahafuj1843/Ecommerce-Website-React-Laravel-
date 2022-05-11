import React, { Component, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert'
import {Link} from 'react-router-dom';


class  My_account extends Component{
    state = {
        id: localStorage.getItem('auth_id'),
        user: []
    }
    
    fetchUserProfile = () =>{
        axios.get(`/api/user-profile-${this.state.id}`).then(res => {
            if(res.data.status === 200)
            {
                this.setState({
                    user: res.data.user
            })
          }
        });
    }
    componentDidMount() {
        this.fetchUserProfile();
    }

    render(){

        return (  
                <div>
                    <div className="col-md-12">
                    <div className="row">
                        <h5>Account Information</h5>
                    </div>
                    <div className="row mt-2">
                        <div className="card p-3 " style={{ width: '100%' }}>
                            <h6>Contact Information</h6>
                            <div className="my-2" onChange = {this.fetchUserProfile}>
                            {
                                this.state.user.map((item) => {
                                    return (
                                            <div key={item.id}>
                                                <span>Username : {item.name}</span><br/>
                                                <span>Email :    {item.email}</span>
                                            </div>
                                    )
                                })
                            }
                            </div>
                            <div>
                                <span className="pe-4 border-end border-secondary">Edit</span><span className="ps-4">Change Password</span>
                            </div>
                        </div><hr/>
                    </div>
                </div>
            </div>
    
        );
    };
}

export default My_account;
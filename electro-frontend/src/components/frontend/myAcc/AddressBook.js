import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import swal from 'sweetalert'


class AddressBook extends Component{
    state = {
       u_id: localStorage.getItem('auth_id'),
       fullname: '',
       phone: '',
       street_address: '',
       village: '',
       state: '',
       city: '',
       error_list: [],
       address: []
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
     }

    addressSubmit = (e) =>{
        e.preventDefault();
            axios.post(`/api/user-address-${this.state.u_id}`, this.state).then(res => {
               if(res.data.status === 200)
               {
                   swal("Success",res.data.massage,"success");
                    this.setState({
                        fullname: '',
                        phone: '',
                        street_address: '',
                        village: '',
                        state: '',
                        city: '',
                    });
               }
               else{
                    this.setState({
                        error_list: res.data.validation_errors
                    });    
               }
            });
    }

    componentDidMount(){
        axios.get(`/api/view-address-${this.state.u_id}`).then(res => {
            if(res.data.status === 200)
            {
            this.setState({
                address: res.data.Address
            })
            this.state.address.map((item) => {
                this.setState({
                    fullname: item.fullname,
                    phone: item.phone,
                    street_address: item.street_address,
                    village: item.village,
                    state: item.state,
                    city: item.city
                 })
            })
          }
        });
    }
    render(){

    return (  
            <div>
                <div className="col-md-12">
                    <form onSubmit={this.addressSubmit}>
                       
                     <div class="d-md-flex mt-5">
                        <div class="col-md-6">
                            <h6>Contact Information</h6><hr/>
                            <div class=" mb-3">
                                <label for="">Fullname</label>
                                <input type="text" name="fullname" onChange={this.handleInput} value={this.state.fullname}  class="form-control"/>
                                <span className="text-danger">{this.state.error_list.fullname}</span>
                            </div>
                            <div class=" mb-3">
                                <label for="">Phone</label>
                                <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} class="form-control" />
                                <span className="text-danger">{this.state.error_list.phone}</span>
                            </div>
                        </div>
                        <div class="col-md-6 ms-md-4">
                            <h6>Address</h6><hr/>
                            <div class=" mb-3">
                                <label for="">Street Address</label>
                                <input type="text" name="street_address" onChange={this.handleInput} value={this.state.street_address} class="form-control"/>
                                <span className="text-danger">{this.state.error_list.street_address}</span>
                            </div>
                            <div class=" mb-3">
                                <label for="">Village</label>
                                <input type="text" name="village" onChange={this.handleInput} value={this.state.village} class="form-control" />
                                <span className="text-danger">{this.state.error_list.village}</span>
                            </div>
                            <div class=" mb-3">
                                <label for="">State</label>
                                <input type="text" name="state" onChange={this.handleInput} value={this.state.state} class="form-control" />
                                <span className="text-danger">{this.state.error_list.state}</span>
                            </div>
                            <div class=" mb-3">
                                <label for="">City</label>
                                <input type="text" name="city" onChange={this.handleInput} value={this.state.city} class="form-control" />
                                <span className="text-danger">{this.state.error_list.city}</span>
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary w-100">Save Address</button>
                            </div>
                        </div>
                    </div>
                    </form> 
                </div>
            </div>
  
        );
    };
}

export default AddressBook;
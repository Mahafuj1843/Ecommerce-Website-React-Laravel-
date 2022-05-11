import React, { Component } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navber from '../../layout/admin/Navber';
import Slideber from '../../layout/admin/Slideber';
import Footer from '../../layout/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class User extends Component{
    state ={
        id : '',
        role_as : '',
        user_list: []
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
     }

    viewUser = (e) =>{
            axios.get('/api/all-user').then(res => {
               if(res.data.status === 200)
               {
                    this.setState({
                        user_list: res.data.User
                    });
               }
            });
    }
    componentDidMount() {
       this.viewUser();
   }
   
   //Show for update
   editRole = (e, id) =>{
    e.preventDefault();

    axios.get(`/api/edit-role-${id}`).then(res => {
        if(res.data.status === 200)
        {
            this.setState({
                id : res.data.u_id,
                role_as: res.data.role
            });
        }
    });
   }

   updateRole = (e) =>{
    e.preventDefault();

        axios.post(`/api/update-role-${this.state.id}`, this.state).then(res => {
           if(res.data.status === 200)
           {
               swal("Success",res.data.massage,"success");
               this.props.history.push('/admin/all-user');
                this.setState({
                    id: '',
                    role_as: ''
                });
           }
           else{
                this.setState({
                    error_list: res.data.validation_errors
                });    
           }
        });
   }
   //Delete
   deleteUser = (e, id) =>{
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting..";
    axios.delete(`/api/delete-user-${id}`).then(res => {
        if(res.data.status === 200)
        {
            swal("Success",res.data.massage,"success");
            this.props.history.push('/admin/all-user');
            thisClicked.closest("tr").remove();
        }
    });
}
    render(){

        return(
            <div class="sb-nav-fixed">
            <Navber />
            <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <Slideber/>
                  <div class="home-section">
                    <div class="home-content">
                    <div class="col-md-12">
                            <div class="card">
                                <div class="card-header h3">All user</div>
                                <div class="card-body">
                                    <table class="table table-hover table-sm align-middle">
                                        <thead>
                                            <tr>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            <th scope="col justify-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.user_list.map((user) => {
                                                return (
                                                    <tr key = {user.id}>
                                                        <th>{user.name}</th>
                                                         <td>{user.email}</td>
                                                         <td>
                                                             {user.role_as===1 ? <span class="badge bg-success">Admin</span> : <span class="badge bg-info text-dark">Customer</span>} 
                                                        </td>
                                                        <td>
                                                            <button type="button" onClick = { (e) => this.editRole(e, user.id)}  className="btn btn-warning mx-3" data-bs-toggle="modal" data-bs-target="#updateRole">Edit</button>
                                                            <button type="button" onClick = { (e) => this.deleteUser(e, user.id)} className="btn btn-danger">Delete</button>
                                                        </td>                          
                                                    </tr>
                                                       
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="modal fade" id="updateRole" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Brand</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                         <form onSubmit={this.updateRole}> 
                            <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Status</label>
                                        <div className="col-md-9">
                                            <select name="role_as" onChange={this.handleInput} value={this.state.role_as} className="form-select" aria-label="">
                                                <option selected disabled>--select--</option>
                                                <option value="1">Admin</option>
                                                <option value="0">User</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                         </form>
                    </div>
                    </div>
                </div>

              </div>

                      <Footer/>
            </div>
        </div>
            );
    };
}
export default User;
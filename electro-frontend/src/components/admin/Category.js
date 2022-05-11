import React, { Component, useEffect, useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import Navber from '../../layout/admin/Navber';
import Slideber from '../../layout/admin/Slideber';
import Footer from '../../layout/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class Category extends Component{
    state = {
        id:'',
        c_name: '',
       status: '',
        error_list: [],
        cat_list: []
    }
    
    handleInput = (e) =>{
       this.setState({
           [e.target.name]: e.target.value
       });
    }

    //Category Add
    categorySubmit = (e) =>{
        e.preventDefault();

            axios.post('/api/add-category', this.state).then(res => {
               if(res.data.status === 200)
               {
                   swal("Success",res.data.massage,"success");
                   this.props.history.push('/admin/category');
                    this.setState({
                        c_name: '',
                        status: ''
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
    deleteCategory = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting..";
        axios.delete(`/api/delete-category-${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.massage,"success");
                this.props.history.push('/admin/category');
                thisClicked.closest("tr").remove();
            }
        });
    }
    
    //Show for update
    editCategory = (e, id) =>{
        e.preventDefault();

        axios.get(`/api/edit-category-${id}`).then(res => {
            if(res.data.status === 200)
            {
                this.setState({
                    id: res.data.Category.id,
                    c_name: res.data.Category.c_name,
                    status: res.data.Category.status
                });
            }
        });
    }

    //update
    updateCategory = (e) =>{
        e.preventDefault();

            axios.post(`/api/update-category-${this.state.id}`, this.state).then(res => {
               if(res.data.status === 200)
               {
                   swal("Success",res.data.massage,"success");
                   this.props.history.push('/admin/category');
                    this.setState({
                        id: '',
                        c_name: '',
                        status: ''
                    });
               }
               else{
                    this.setState({
                        error_list: res.data.validation_errors
                    });    
               }
            });
    }

    //Show for table 1st part
    fetchCategory = () =>{
        axios.get('/api/view-category').then(res => {
            if(res.data.status === 200)
            {
                this.setState({
                    cat_list: res.data.Category
                }); 
            }
        });
    }
    componentDidMount() {
        this.fetchCategory();
    }

    render(){

        //Show for table 2nd part
        let viewCategory_Table =  this.state.cat_list.map((item) => {
            return (
                <tr key = {item.id}>
                    <th className="text-center">{item.c_name}</th>
                    <td className="text-center">
                        {item.status===1 ? 'Active' : 'Deactive'}   
                    </td>
                    <td className="text-center">
                        <button type="button" onClick = { (e) => this.editCategory(e, item.id)} className="btn btn-warning mx-3" data-bs-toggle="modal" data-bs-target="#updateCategory">Edit</button>
                        <button type="button" onClick = { (e) => this.deleteCategory(e, item.id)} className="btn btn-danger">Delete</button>
                    </td>                          
                </tr>
            )
        });
        return (

            <div className="sb-nav-fixed">
            <Navber />
            <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <Slideber/>
                  <section className="home-section">
                    <div className="home-content ">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">All Category
                                    <button type="button" className="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addCategory">
                                        Add Category
                                    </button>
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover table-sm align-middle">
                                        <thead>
                                            <tr>
                                            <th scope="col" className="text-center">Category Name</th>
                                            <th scope="col" className="text-center">Status</th>
                                            <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {viewCategory_Table}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <div className="modal fade" id="addCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={this.categorySubmit}>
                           <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-1 row">
                                        <label for="" className="col-md-3 col-form-label">Name</label>
                                        <div className="col-md-9">
                                        <input type="text" name="c_name" onChange={this.handleInput} value={this.state.c_name} className="form-control" id="catname"/>
                                        <span className="text-danger">{this.state.error_list.c_name}</span>
                                        </div>
                                    </div><br/>
                                    <div className="mb-1 row">
                                        <label for="" className="col-md-3 col-form-label">Status</label>
                                        <div className="col-md-9">
                                            <select name="status" onChange={this.handleInput} value={this.state.status}  className="form-select" aria-label="">
                                                <option disabled value="">--select--</option>
                                                <option value="1">Active</option>
                                                <option  value="0">Deactive</option>
                                            </select>
                                            <span className="text-danger">{this.state.error_list.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>

                <div className="modal fade" id="updateCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={this.updateCategory}>
                           <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-1 row">
                                        <label for="" className="col-md-3 col-form-label">Name</label>
                                        <div className="col-md-9">
                                        <input type="text" name="c_name" onChange={this.handleInput} value={this.state.c_name} className="form-control" id="catname"/>
                                        <span className="text-danger">{this.state.error_list.c_name}</span>
                                        </div>
                                    </div><br/>
                                    <div className="mb-1 row">
                                        <label for="" className="col-md-3 col-form-label">Status</label>
                                        <div className="col-md-9">
                                            <select name="status" onChange={this.handleInput} value={this.state.status}  className="form-select" aria-label="">
                                                <option disabled value="">--select--</option>
                                                <option value="1">Active</option>
                                                <option  value="0">Deactive</option>
                                            </select>
                                            <span className="text-danger">{this.state.error_list.status}</span>
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
export default Category;
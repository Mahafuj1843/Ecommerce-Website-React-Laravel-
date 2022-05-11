import React, { Component } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navber from '../../layout/admin/Navber';
import Slideber from '../../layout/admin/Slideber';
import Footer from '../../layout/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class Brand extends Component{

    state ={
        id: '',
        b_name: '',
        c_id: '',
        status: null,
        brand_list: [],
        error_list: [],
        cat_list: []
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
     }

     //Add brand
     brandSubmit = (e) =>{
        e.preventDefault();

        axios.post('/api/add-brand', this.state).then(res => {
           if(res.data.status === 200)
           {
               swal("Success",res.data.massage,"success");
               this.props.history.push('/admin/brand');
                this.setState({
                    b_name: '',
                    c_id: '',
                    status: null
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
     deleteBrand = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting..";
        axios.delete(`/api/delete-brand-${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.massage,"success");
                this.props.history.push('/admin/brand');
                thisClicked.closest("tr").remove();
            }
        });
    }

    //Show for update
    editBrand = (e, id) =>{
        e.preventDefault();

        axios.get(`/api/edit-brand-${id}`).then(res => {
            if(res.data.status === 200)
            {
                this.setState({
                    id: res.data.Brand.id,
                    b_name: res.data.Brand.b_name,
                    c_id: res.data.Brand.c_id,
                    status: res.data.Brand.status
                });
            }
        });
    }
    
    //update
    updateBrand = (e) =>{
        e.preventDefault();

            axios.post(`/api/update-brand-${this.state.id}`, this.state).then(res => {
               if(res.data.status === 200)
               {
                   swal("Success",res.data.massage,"success");
                   this.props.history.push('/admin/brand');
                    this.setState({
                        id: '',
                        b_name: '',
                        c_id: '',
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
    
    //Show Brand in table by category 1st part
     catIdSubmit = (e) =>{
         e.preventDefault();
             axios.get(`/api/view-brand-${this.state.c_id}`).then(res => {
                if(res.data.status === 200)
                {
                    this.props.history.push('/admin/brand');
                     this.setState({
                         c_id: '',
                         brand_list: res.data.Brand
                     });
                }
             });
     }
     componentDidMount() {
        this.catIdSubmit();
    }

    //fetch category for select box 1st parts
     fetchCategory = () =>{
        axios.get('/api/active-category').then(res => {
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

        //Show Brand in table by category 1st part
        let viewBrand_Table =  this.state.brand_list.map((item) => {
            return (
                <tr key = {item.id}>
                    <th className="text-center">{item.b_name}</th>
                    <td className="text-center">
                        {item.status===1 ? 'Active' : 'Deactive'}   
                    </td>
                    <td>
                        <button type="button" onClick = { (e) => this.editBrand(e, item.id)} className="btn btn-warning mx-3" data-bs-toggle="modal" data-bs-target="#updateBrand">Edit</button>
                        <button type="button" onClick = { (e) => this.deleteBrand(e, item.id)} className="btn btn-danger">Delete</button>
                    </td>                          
                </tr>
            )
        });
        
        //fetch category for select box 2nd part
        let viewCategory_Name =  this.state.cat_list.map((category) => {
            return (
                <option key = {category.id} value={category.id}>{category.c_name}</option>   
            )
        });

        return (
            <div class="sb-nav-fixed">
            <Navber />
            <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <Slideber/>
                  <div class="home-section">
                    <div class="home-content ">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header h3">All Brand
                                    <button type="button" class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addBrand">
                                        Add Brand
                                    </button>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.catIdSubmit}>
                                        <div className="my-3 row d-flex justify-content-center">
                                            <label for="" className="col-md-2 col-form-label h4">Select category</label>
                                            <div className="col-md-3">
                                                <select name="c_id" onChange={this.handleInput} value={this.state.c_id} className="form-select" aria-label="">  
                                                    <option value="" selected disabled>--Select--</option>
                                                    {viewCategory_Name}
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                               <button type="submit" class="btn btn-success">View</button>
                                            </div>
                                        </div>
                                    </form>
                                    <table class="table table-hover table-sm align-middle">
                                        <thead>
                                            <tr>
                                            <th scope="col" className="text-center">Brand Name</th>
                                            <th scope="col" className="text-center">Status</th>
                                            <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewBrand_Table}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="addBrand" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Brand</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={this.brandSubmit}>
                            <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Name</label>
                                        <div className="col-md-9">
                                        <input type="text" name="b_name" onChange={this.handleInput} value={this.state.b_name} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Category</label>
                                        <div className="col-md-9">
                                            <select name="c_id" onChange={this.handleInput} value={this.state.c_id} className="form-select" aria-label="">  
                                                <option value="" selected disabled>--Select--</option>
                                                {viewCategory_Name}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Status</label>
                                        <div className="col-md-9">
                                            <select name="status" onChange={this.handleInput} value={this.state.status} className="form-select" aria-label="">
                                                <option selected disabled>--select--</option>
                                                <option value="1">Active</option>
                                                <option value="0">Deactive</option>
                                            </select>
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

                <div className="modal fade" id="updateBrand" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Brand</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={this.updateBrand}>
                            <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Name</label>
                                        <div className="col-md-9">
                                        <input type="text" name="b_name" onChange={this.handleInput} value={this.state.b_name} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Category</label>
                                        <div className="col-md-9">
                                            <select name="c_id" onChange={this.handleInput} value={this.state.c_id} className="form-select" aria-label="">  
                                                <option value="" selected disabled>--Select--</option>
                                                {viewCategory_Name}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Status</label>
                                        <div className="col-md-9">
                                            <select name="status" onChange={this.handleInput} value={this.state.status} className="form-select" aria-label="">
                                                <option selected disabled>--select--</option>
                                                <option value="1">Active</option>
                                                <option value="0">Deactive</option>
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
            </div>
            <Footer/>
        </div>
            
        );
    };
}
export default Brand;
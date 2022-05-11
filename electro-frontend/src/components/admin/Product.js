import React, { Component } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navber from '../../layout/admin/Navber';
import Slideber from '../../layout/admin/Slideber';
import Footer from '../../layout/admin/Footer';
import axios from 'axios';
import swal from 'sweetalert'

class Product extends Component{

    state ={
        id:'',
        name: '',
        description: '',
        original_price: '',
        selling_price: '',
        image: null,
        quantity: '',
        c_id: '',
        b_id: '',
        brand_list: [],
        error_list: [],
        cat_list: [],
        product_list: []
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
     }
     handleImage = (e) =>{
         this.setState({
            image : e.target.files[0]
         })
     }
      
    productSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('original_price', this.state.original_price);
        formData.append('selling_price', this.state.selling_price);
        formData.append('image', this.state.image);
        formData.append('quantity', this.state.quantity);
        formData.append('c_id', this.state.c_id);
        formData.append('b_id', this.state.b_id);
        axios.post('/api/add-product', formData).then(res => {
           if(res.data.status === 200)
           {
               swal("Success",res.data.massage,"success");
               this.props.history.push('/admin/product');
                this.setState({
                    name: '',
                    description: '',
                    original_price: '',
                    selling_price: '',
                    image: null,
                    quantity: '',
                    c_id: '',
                    b_id: ''
                });
           }
           else{
                this.setState({
                    error_list: res.data.validation_errors
                });    
           }
        });
     }

    //Show for update
    editProduct = (e, id) =>{
        e.preventDefault();

        axios.get(`/api/edit-product-${id}`).then(res => {
            if(res.data.status === 200)
            {
                this.setState({
                    id: res.data.Product.id,
                    name: res.data.Product.name,
                    description: res.data.Product.description,
                    original_price: res.data.Product.original_price,
                    selling_price: res.data.Product.selling_price,
                    image: res.data.Product.image,
                    quantity: res.data.Product.quantity,
                    c_id: res.data.Product.c_id,
                    b_id: res.data.Product.b_id,
                });
            }
        });
    }
    //update
    updateProduct = (e) =>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('original_price', this.state.original_price);
        formData.append('selling_price', this.state.selling_price);
        formData.append('image', this.state.image);
        formData.append('quantity', this.state.quantity);
        formData.append('c_id', this.state.c_id);
        formData.append('b_id', this.state.b_id);

            axios.post(`/api/update-product-${this.state.id}`, formData).then(res => {
               if(res.data.status === 200)
               {
                   swal("Success",res.data.massage,"success");
                   this.props.history.push('/admin/product');
                    this.setState({
                        id: '',
                        name: '',
                        description: '',
                        original_price: '',
                        selling_price: '',
                        image: '',
                        quantity: '',
                        c_id: '',
                        b_id: ''
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
    deleteProduct = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting..";
        axios.delete(`/api/delete-product-${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Success",res.data.massage,"success");
                this.props.history.push('/admin/product');
                thisClicked.closest("tr").remove();
            }
        });
    }


     catIdSubmit = (e) =>{
        e.preventDefault();
        axios.get(`/api/view-product-${this.state.c_id}-${this.state.b_id}`).then(res => {
            if(res.data.status === 200)
            {
                 this.setState({
                     product_list: res.data.Product
                 });
            }else{
                swal("Success",res.data.massage,"success");
            }
         });
     }

     //fetch category for select box 1st parts
     category = () =>{
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
        this.category();
    }

    selectState = (e) =>{
             axios.get(`/api/view-brand-${this.state.c_id}`).then(res => {
                if(res.data.status === 200)
                {
                     this.setState({
                         brand_list: res.data.Brand
                     });
                }
             });
    }
     render(){

        //fetch category for select box 2nd part
        let viewCategory_Name =  this.state.cat_list.map((category) => {
            return (
                <option key = {category.id} value={category.id}>{category.c_name}</option>   
            )
        });

        //fetch brand for select box 2nd part
        let viewBrand_Name =  this.state.brand_list.map((brand) => {
            return (
                <option key = {brand.id} value={brand.id}>{brand.b_name}</option>   
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
                                <div class="card-header h3">All product
                                    <button type="button" class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addProduct">
                                        Add product
                                    </button>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.catIdSubmit}>
                                        <div className="my-3 row d-inline-flex col-md-12 justify-content-center">
                                            <label for="" className="col-md-1 col-form-label h4">Select</label>
                                            <div className="col-md-3">
                                                 <select name="c_id" onChange={this.handleInput} onClick={this.selectState} value={this.state.c_id} class="form-select" aria-label="">  
                                                    <option value="" disabled>Category</option>
                                                     {viewCategory_Name}
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <select name="b_id" onChange={this.handleInput} value={this.state.b_id} class="form-select" aria-label="">  
                                                    <option value="" selected disabled>Brand</option>
                                                    {viewBrand_Name}
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
                                            <th scope="col" className="text-center">Product Name</th>
                                            <th scope="col" className="text-center">Image</th>
                                            <th scope="col" className="text-center">Original Price</th>
                                            <th scope="col" className="text-center">Selling Price</th>
                                            <th scope="col" colspan="2" className="text-center">Description</th>
                                            <th scope="col" className="text-center">Quantity</th>
                                            <th scope="col" colspan="2" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.product_list.map((product) => {
                                                return (
                                                    <tr key = {product.id}>
                                                        <th className="text-center">{product.name}</th>
                                                        <td className="text-center"><img src={`http://localhost:8000/${product.image}`} style={{width : 60, height: 70} } alt={product.image}/></td>
                                                         <td className="text-center">{product.original_price}</td>
                                                         <td className="text-center">{product.selling_price}</td>
                                                         <td colspan="2" className="text-center">{product.description}</td>
                                                         <td className="text-center">{product.quantity}</td>
                                                        <td className="text-center">
                                                            <button type="button" onClick = { (e) => this.editProduct(e, product.id)}  className="btn btn-warning mx-3" data-bs-toggle="modal" data-bs-target="#updateProduct">Edit</button>
                                                        </td>
                                                        <td className="text-center">  
                                                            <button type="button" onClick = { (e) => this.deleteProduct(e, product.id)} className="btn btn-danger">Delete</button>
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

                <div className="modal fade" id="addProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={this.productSubmit}>
                            <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Name</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Description</label>
                                        <div className="col-md-8 ms-auto">
                                        <textarea type="text" name="description" onChange={this.handleInput} value={this.state.description} className="form-control" rows="3" style={{resize:'none'}} id="catname"></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-4 col-form-label">Original Price</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="original_price" onChange={this.handleInput} value={this.state.original_price}className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Selling Price</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="selling_price" onChange={this.handleInput} value={this.state.selling_price}className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Image</label>
                                        <div className="col-md-8 ms-auto">
                                            <input class="form-control" type="file" name="image" onChange={this.handleImage} id="formFile"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Quantity</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="quantity" onChange={this.handleInput} value={this.state.quantity} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-4 col-form-label">Select Category</label>
                                        <div className="col-md-8 ms-auto">
                                            <select name="c_id" onChange={this.handleInput} onClick={this.selectState} value={this.state.c_id} className="form-select" aria-label="">  
                                                <option value="" selected disabled>--Select--</option>
                                                   {viewCategory_Name}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-4 col-form-label">Select Brand</label>
                                        <div className="col-md-8 ms-auto">
                                            <select name="b_id" onChange={this.handleInput} value={this.state.b_id} className="form-select" aria-label="">
                                                <option value="" selected disabled>--select--</option>
                                                {viewBrand_Name}
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

                <div className="modal fade" id="updateProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={this.updateProduct}>
                            <div className="modal-body">
                                <div className="justify-content-center mx-3">
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Name</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Description</label>
                                        <div className="col-md-8 ms-auto">
                                        <textarea type="text" name="description" onChange={this.handleInput} value={this.state.description} className="form-control" rows="3" style={{resize:'none'}} id="catname"></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-4 col-form-label">Original Price</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="original_price" onChange={this.handleInput} value={this.state.original_price} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Selling Price</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="selling_price" onChange={this.handleInput} value={this.state.selling_price} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Image</label>
                                        <div className="col-md-8 ms-auto">
                                            <input class="form-control" type="file" name="image" onChange={this.handleImage} id="formFile"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-3 col-form-label">Quantity</label>
                                        <div className="col-md-8 ms-auto">
                                        <input type="text" name="quantity" onChange={this.handleInput} value={this.state.quantity} className="form-control" id="catname"/>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-4 col-form-label">Select Category</label>
                                        <div className="col-md-8 ms-auto">
                                            <select name="c_id" onChange={this.handleInput} onClick={this.selectState} value={this.state.c_id} className="form-select" aria-label="">  
                                                <option value="" selected disabled>--Select--</option>
                                                   {viewCategory_Name}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-2 row">
                                        <label for="" className="col-md-4 col-form-label">Select Brand</label>
                                        <div className="col-md-8 ms-auto">
                                            <select name="b_id" onChange={this.handleInput} value={this.state.b_id} className="form-select" aria-label="">
                                                <option value="" selected disabled>--select--</option>
                                                {viewBrand_Name}
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
export default Product;
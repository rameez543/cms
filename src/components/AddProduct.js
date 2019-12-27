import React from 'react';
import '../styles/AddProduct.css'
import axios from 'axios'
import {DEV_URL} from '../config/config'
import { connect } from 'react-redux';
import { getProducts, getCategories, getBrands, } from '../redux/ActionCreators'
 class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = { openModal: false, selectedCategory: 0, selectedBrand: 0 }
    }
    handleClick = () => {
        this.setState({ openModal: true })
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({[e.target.name]:e.target.value})
        // if (e.target.name === 'category') {
        //     this.setState({ selectedCategory: e.target.value })
        //  if(e.target.name === 'brandName'){
        //      this.setState({brandName:e.target.value})
        //  }   
        // }
    }
    postBrand = async()=>{
        const {showAddBrand,brandName}= this.state
       const resp = await axios.post(`${DEV_URL}/add-brands`,{brandName})
       console.log('resp',resp)
       if(resp.data && resp.data.success){
           this.props.getBrands()
           this.setState({showAddBrand:false,brandName:''})
       }
    }
    modal = () => {
        const { category, brand } = this.props
        const { openModal, selectedCategory, selectedBrand } = this.state
        return (
            <div id="myModal" className="modal" style={{ display: openModal ? 'block' : 'none' }}>

                <div className="modal-content" >

                    <span className="close" onClick={() => this.setState({ openModal: false })}>X</span>
                    <div>
                        <h3>select category</h3>
                        <select value={selectedCategory} onChange={this.handleChange} name='category'>
                            {category && category.map(category => <option value={category.id}>{category.categoryName}</option>)}
                        </select>
                        <span style={{ margin: '4px' }}><button onClick={() => this.setState({ showAddCategory: true })}>+</button><span style={{fontSize:'12px',color:'blue', margin:'4px'}}>add new category</span></span>
                        {this.addCategory()}
                    </div>
                    <div>
                        <h3>select brand</h3>
                        <select value={selectedBrand} onChange={this.handleChange} name='brand'>
                            {brand && brand.map(brand => <option value={brand.id}>{brand.brandName}</option>)}
                        </select>
                        <span style={{ margin: '4px' }}><button onClick={() => this.setState({ showAddBrand: true })}>+</button>
                        <span style={{fontSize:'12px',color:'blue', margin:'4px'}}>add new brand</span>
                        </span>
                        {this.addBrand()}
                    </div>
                    <div>
                        <h3>Product Name</h3>
                        <input type = "text"></input>
                        <h3>Specifications</h3>
                        <textarea type = "text"></textarea>
                    </div>
                    <button className="btn">Save</button>
                </div>

            </div>

        )
    }
    addCategory = () => {
        const {category } = this.props
        const { showAddCategory,selectedCategory } = this.state
        return (<div>{
            showAddCategory && <div style={{ margin: '4px' }}>
                <span>category name </span><input type='text'></input>
                <div>
                    <span>select Parent category</span>
                    <select value={selectedCategory} onChange={this.handleChange} name='parentCategoryID' style={{ margin: '4px' }}>
                        <option value={null}>Null</option>
                        {category && category.map(category => <option value={category.id}>{category.categoryName}</option>)}
                    </select>
                    <div>
                        <button>Add</button>
                    </div>
                </div>
            </div>
        }
        </div>)
    }
    addBrand = () => {
        const { brandName } = this.state
        const { showAddBrand } = this.state
        return (<div>{
            showAddBrand && <div style={{ margin: '4px' }}>
                <span>brand name </span><input type='text' name = "brandName" value={brandName} onChange={this.handleChange} ></input>
                <button onClick ={this.postBrand}>Add</button>
            </div>
        }
        </div>)
    }
    render() {
        console.log('select', this.state.brandName)
        return (
            <div >
                <button className='btn' onClick={this.handleClick}>Add Product</button>
                {this.modal()}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    products: state.productsReducer.products,
    brands: state.productsReducer.brands,
    categories: state.productsReducer.categories
  })
  const mapDispatchToProps = { getProducts, getCategories, getBrands,  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
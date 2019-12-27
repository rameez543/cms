import React from 'react';
import '../styles/productList.css';
import { connect } from 'react-redux';
import { getProducts, getCategories, getBrands, } from '../redux/ActionCreators';
import axios from 'axios';
import { DEV_URL } from '../config/config'
import '../styles/Filter.css'

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brandID: -1,
            categoryID: -1
        }
    }
    handleChange = (e) => {
        const { categoryID, brandID } = this.state
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    handleClick = () => {
        const { categoryID, brandID } = this.state
        this.props.getProducts(`?categoryID=${categoryID}&&brandID=${brandID}`)
    }
    render() {
        const { list, brands, categories } = this.props
        return (<React.Fragment>
            <span> category
            <select onChange={this.handleChange} name='categoryID' style={{ margin: '4px' }}>
                    <option value={-1}>All</option>
                    {categories && categories.map(category => <option value={category.id}>{category.categoryName}</option>)}
                </select></span>

            brand
            <select onChange={this.handleChange} name='brandID' style={{ margin: '4px' }}>
                <option value={-1}>All</option>
                {brands && brands.map(brand => <option value={brand.id}>{brand.brandName}</option>)}
            </select><button onClick={this.handleClick}>filter</button>
        </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = { getProducts, getCategories, getBrands, }

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
import React from 'react';
import '../styles/productList.css';
import { connect } from 'react-redux';
import { getProducts, getCategories, getBrands, } from '../redux/ActionCreators';
import {categoryTree} from '../utils'

class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
   
    render() {
        const { list, brands, categories, parents } = this.props
        let parentTree = categoryTree(categories)
        return (
            list && list.length > 0 ? list.map((item, key) => {
                const brand = brands && brands.data.find(brand => brand.id === item.brandID)
                const brandName = brand && brand.brandName
                const category = categories && categories.data.find(category => category.id === item.categoryID)
                const categoryName = category && category.categoryName
                const parentCategoryID = category && category.parentCategory
                const parentCategory = categories && categories.data.find(category => category.id === parentCategoryID)
                const parentCategoryName = parentCategory && parentCategory.categoryName
               
                return (
                    <div className="card" key={key}>
                        <div>
                            <span style={{ color: 'green', fontSize: '16px' }}>
                                category Tree ::: 
                                <span style = {{color:"red"}}>
                                {parentTree[item.categoryID] && parentTree[item.categoryID].length > 0 ? parentTree[item.categoryID].join(" > ") : ''}
                                    </span> 
                            </span>
                            <h1>{`${item.productName}`}</h1>
                        </div>
                        <div className="card-content">

                            <table border={1} cellPadding={5} cellSpacing={5} width={600}>
                                <tbody>
                                    <tr>
                                        <td className='table-data'>Category</td>
                                        <td>{categoryName}</td>
                                    </tr>
                                    <tr>
                                        <td className='table-data'>Parent Category</td>
                                        <td>{parentCategoryName}</td>
                                    </tr>
                                    <tr>
                                        <td className='table-data'>Brand</td>
                                        <td>{brandName}</td>
                                    </tr>
                                    <tr>
                                        <td className='table-data'>Specification</td>
                                        <td>{item.specification}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>)
            }
            ) : <div>no data</div>
        )
    }
}
const mapStateToProps = (state) => ({
    products: state.productsReducer.products,
    brands: state.productsReducer.brands,
    categories: state.productsReducer.categories
})
const mapDispatchToProps = { getProducts, getCategories, getBrands, }

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
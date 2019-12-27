import React from 'react';
import './app.css'
import { connect } from 'react-redux';
import { getProducts, getCategories, getBrands, } from './redux/ActionCreators'
import { ProductList } from './components/ProducList'
import AddProduct from './components/AddProduct'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productList: [] }
  }
  componentDidMount() {
    this.props.getProducts()
    this.props.getBrands()
    this.props.getCategories()
  }
  mapProductData() {
    const { productList } = this.state
    const { products, categories, brands } = this.props
    let productData = {}
    if (products && products.data && products.data.length && categories && categories.data && brands && brands.data) {
      products.data.forEach(item => {
        productData.productName = item.productName
        const category = categories.data.filter(category => category.id === item.categoryID)
        productData.categoryName = category[0].categoryName
        const brand = brands.data.filter(brand => brand.id === item.brandID)
        productData.brandName = brand[0].brandName
      })
    }
    if (Object.keys(productData).length>0) productList.push(productData)
    this.setState({ productList })
    console.log('prdc', productData)
  }
  componentDidUpdate(nextProps) {
    if (this.props.products !== nextProps.products || this.props.categories !== nextProps.categories) {
      this.mapProductData()
    }
  }
  render() {
    const { productList } = this.state;
    const { categories ,brands} = this.props
    console.log("prp", this.props)
    return (<div className='app'>
      <AddProduct category={categories && categories.data} brand={brands && brands.data}/>
      <ProductList list={productList} />
    </div>)
  }
}

const mapStateToProps = (state) => ({
  products: state.productsReducer.products,
  brands: state.productsReducer.brands,
  categories: state.productsReducer.categories
})
const mapDispatchToProps = { getProducts, getCategories, getBrands,  }

export default connect(mapStateToProps, mapDispatchToProps)(App);

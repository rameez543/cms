import React from 'react';
import './app.css'
import { connect } from 'react-redux';
import { getProducts, getCategories, getBrands, } from './redux/ActionCreators'
import  ProductList  from './components/ProducList'
import AddProduct from './components/AddProduct'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { productList: [] }
  }
  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getBrands()
    await this.props.getCategories()
        //  this.mapProductData()
  }
  // mapProductData() {
  //   const { productList } = this.state
  //   const { products, categories, brands } = this.props
  //   // console.log('prdcts',products.data)
  //   let productData = {}
  //   if (products && products.data && products.data.length && categories && categories.data && brands && brands.data) {
  //     products.data.map(item => {
  //       productData.productName = item.productName
  //       const category = categories.data.find(category => category.id === item.categoryID)
  //       console.log('categorydddd',category)
  //       // productData.categoryName = category
  //       productData.categoryName =category && category.categoryName 
  //       const brand = brands.data.find(brand => brand.id === item.brandID)
  //       productData.brandName = brand && brand.brandName
  //       if (Object.keys(productData).length>0) productList.push(productData)
  //     })
      
  //     this.setState({productList})
  //   }
    
  //   console.log('prdc', productData)
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.productes && prevProps.products.data&&prevProps.products.data !== this.props.products.data) {
      this.props.getProducts()
    }
  }
  render() {
    const { productList } = this.state;
    const { categories ,brands,products} = this.props
    // console.log("prdctlist", ProductList)
    return (<div className='app'><span>
      <AddProduct category={categories && categories.data} brand={brands && brands.data}/>
      <Filter categories={categories && categories.data} brands={brands && brands.data}/>
      </span>
      <ProductList list={products && products.data} />
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
